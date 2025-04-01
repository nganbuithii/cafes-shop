"use client";

import { useEffect, useState, useRef } from "react";
import { Utensils, Soup, IceCream } from "lucide-react";
import Link from "next/link";
import "animate.css";

export default function ExploreSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Chỉ chạy animation một lần
                }
            },
            { threshold: 0.3 } // Kích hoạt khi 30% section xuất hiện trên màn hình
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="container mx-auto px-6 py-16">
            <div className={`text-center mb-12 ${isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"}`}>
                <h2 className="text-4xl font-bold text-gray-900  mb-3">Explore Our Alowishus</h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Discover our delicious catering services, fresh food options, and tasty gelato.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card
                    title="Our Catering"
                    description="Enjoy our high-quality catering services for events and gatherings."
                    icon={<Utensils className="w-16 h-16 text-gray-700" />}
                    link="/catering"
                    linkText="Order Catering"
                    isVisible={isVisible}
                />

                <Card
                    title="The Food"
                    description="Delicious and freshly prepared meals for every occasion."
                    icon={<Soup className="w-16 h-16 text-gray-700" />}
                    link="/menu"
                    linkText="Food Menu"
                    isVisible={isVisible}
                />

                <Card
                    title="The Gelato"
                    description="Indulge in our handcrafted gelato with a variety of flavors."
                    icon={<IceCream className="w-16 h-16 text-gray-700" />}
                    link="/gelato"
                    linkText="Discover More"
                    isVisible={isVisible}
                />
            </div>
        </section>
    );
}

interface CardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
    linkText: string;
    isVisible: boolean;
}

function Card({ title, description, icon, link, linkText, isVisible }: CardProps) {
    return (
        <div
            className={`bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 ${
                isVisible ? "animate__animated animate__zoomIn" : "opacity-0"
            }`}
        >
            <div className="mb-5">{icon}</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            <Link
                href={link}
                className="bg-amber-100 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition-all duration-200"
            >
                {linkText}
            </Link>
        </div>
    );
}
