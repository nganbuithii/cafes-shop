'use client'
import { ReactNode, useState, useEffect, useMemo } from "react";
import { Message, Preferences, Product } from "./types/productType";
import { useRecommendationStore } from "@/store/recommendationStore";
import { useProducts } from "@/queries/useProducts";
import { generateSlug } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { CiMicrophoneOn } from "react-icons/ci";
import Image from "next/image";

export default function AIChatbotPopup() {
    const { setPreferences, setRecommendations } = useRecommendationStore();
    const [input, setInput] = useState<string>("");
    const router = useRouter();
    const pathname = usePathname();
    const [messages, setMessages] = useState<Message[]>([
        { sender: "bot", text: "Hello! What do you like? (e.g., I like sweet, no bitter)" }
    ]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isListening, setIsListening] = useState<boolean>(false);

    // Hide chat on login and register pages
    const shouldShowChat = !pathname?.includes('/login') && !pathname?.includes('/register');

    const { data: menuItems, isLoading, error } = useProducts();

    const SpeechRecognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    const recognition = useMemo(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            return SpeechRecognition ? new SpeechRecognition() : null;
        }
        return null;
    }, []);

    useEffect(() => {
        if (recognition) {
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onerror = () => {
                setIsListening(false);
                alert("Sorry, I couldn't understand you. Please try again.");
            };
        }
    }, [recognition]);

    const handleProductClick = (product: Product) => {
        const slug = generateSlug(product.name);
        router.push(`/products/${slug}-${product.id}`);
    };

    const handleSend = () => {
        if (!input.trim() || !menuItems) return;

        setMessages((prev) => [...prev, { sender: "user", text: input }]);

        const prefs: Preferences = {
            sweet: input.toLowerCase().includes("sweet"),
            bitter: input.toLowerCase().includes("bitter"),
            sour: input.toLowerCase().includes("sour"),
            noBitter: input.toLowerCase().includes("no bitter"),
        };
        setPreferences(prefs);

        const recommended = menuItems.filter((item: Product) => {
            if (prefs.sweet && !item.sweet) return false;
            if (prefs.bitter && !item.bitter) return false;
            if (prefs.sour && !item.sour) return false;
            if (prefs.noBitter && item.bitter) return false;
            return true;
        });

        setRecommendations(recommended);

        const botResponse =
            recommended.length > 0 ? (
                <>
                    <p>Based on your preferences, I recommend:</p>
                    <ul className="mt-2 space-y-2">
                        {recommended.map((item) => (
                            <li key={item.id} className="flex items-center gap-3">
                                <Image
                                    src={item.image_url}
                                    alt={item.name}
                                    width={48}  height={48}
                                    className="rounded object-cover"
                                />
                                <div>
                                    <p className="font-bold">{item.name} ({item.price} VNĐ)</p>
                                    <button
                                        onClick={() => handleProductClick(item)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                "Sorry, I couldn't find a suitable dish. Would you like to try again?"
            );

        setMessages((prev) => [...prev, { sender: "bot", text: botResponse as ReactNode }]);
        setInput("");
    };

    const toggleSpeechRecognition = () => {
        if (!recognition) {
            alert("Speech recognition is not supported in your browser.");
            return;
        }

        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    if (!shouldShowChat) {
        return null;
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-600 transition"
            >
                💬 Chat
            </button>

            {isOpen && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="bg-white dark:bg-gray-800 w-96 h-[500px] rounded-lg shadow-lg flex flex-col overflow-hidden">
                        <div className="bg-pink-500 text-white p-4 flex justify-between items-center">
                            <span>🤖 Nanies Chat</span>
                            <button onClick={() => setIsOpen(false)} className="text-white font-bold">✖</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {isLoading ? (
                                <p>Loading menu...</p>
                            ) : error ? (
                                <p className="text-red-500">Error loading menu.</p>
                            ) : (
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "user" ? "bg-pink-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
                                        >
                                            <div className="whitespace-pre-wrap">{msg.text}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Enter your preferences..."
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                                />
                                <button
                                    onClick={toggleSpeechRecognition}
                                    className={`p-2 rounded-lg ${isListening ? "bg-red-500" : "bg-transparent"} text-white hover:bg-opacity-80 transition border border-pink-500`}
                                    disabled={!SpeechRecognition}
                                    title="Use voice input"
                                >
                                    <CiMicrophoneOn className="text-black dark:text-white" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                                    disabled={isLoading}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}