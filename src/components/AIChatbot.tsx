'use client'
import { useState } from "react";
import { Message, Preferences, Product } from "./types/productType";
import { useRecommendationStore } from "@/store/recommendationStore";
import { useProducts } from "@/queries/useProducts";

export default function AIChatbotPopup() {
    const { setPreferences, setRecommendations } = useRecommendationStore();
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([
        { sender: "bot", text: "Hello! What do you like? (e.g., I like sweet, no bitter)" }
    ]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data: menuItems, isLoading, error } = useProducts();

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
            recommended.length > 0
                ? "Based on your preferences, I recommend:\n" +
                recommended.map((item) => `- ${item.name} (${item.price} VNĐ)`).join("\n")
                : "Sorry, I couldn't find a suitable dish. Would you like to try again?";

        setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
        setInput("");
    };

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
                    <div className="bg-white w-96 h-[500px] rounded-lg shadow-lg flex flex-col overflow-hidden">
                        <div className="bg-pink-500 text-white p-4 flex justify-between items-center">
                            <span>🤖 AI Chatbot</span>
                            <button onClick={() => setIsOpen(false)} className="text-white font-bold">✖</button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto">
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
                                            className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "user" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-800"
                                                }`}
                                        >
                                            <pre className="whitespace-pre-wrap">{msg.text}</pre>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Enter your preferences..."
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
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
