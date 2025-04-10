"use client";

import { useEffect, useState, useRef } from "react";
import { Utensils, Soup, IceCream } from "lucide-react";
import Link from "next/link";
import "animate.css";
import { useTranslations } from "next-intl";

export default function ExploreSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("explore");
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
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t("title")}</h2>
                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    {t("description")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card
                    title={t("catering")}
                    description={t("catering_desc")}
                    icon={<Utensils className="w-16 h-16 text-gray-700 dark:text-gray-300" />}
                    link="/catering"
                    linkText={t("order_catering")}
                    isVisible={isVisible}
                />

                <Card
                    title={t("food")}
                    description={t("food_desc")}
                    icon={<Soup className="w-16 h-16 text-gray-700 dark:text-gray-300" />}
                    link="/menu"
                    linkText={t("order_catering")}
                    isVisible={isVisible}
                />

                <Card
                    title={t("gelato")}
                    description={t("gelato_desc")}
                    icon={<IceCream className="w-16 h-16 text-gray-700 dark:text-gray-300" />}
                    link="/gelato"
                    linkText={t("discover_more")}
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
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 ${isVisible ? "animate__animated animate__zoomIn" : "opacity-0"
                }`}
        >
            <div className="mb-5">{icon}</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
            <Link
                href={link}
                className="bg-amber-100 dark:bg-amber-200 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white dark:hover:text-gray-100 text-gray-800 dark:text-gray-800 px-6 py-2 rounded-md font-medium transition-all duration-200"
            >
                {linkText}
            </Link>
        </div>
    );
}
