"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    const t = useTranslations("hero_section");
    return (
        <section className="container mx-auto px-6 py-10 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate__animated animate__bounceInLeft">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-gray-100">
                    {t("title")}
                    <span className="px-3">{t("highlight")}</span>
                </h1>

                <div className="mb-6">
                    <Image
                        src="/images/coffee-beans.png"
                        alt="Cafe Award Badge"
                        width={80}
                        height={80}
                        className="inline-block ml-40"
                    />
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {t("description")}
                </p>

                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/shop"
                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white px-8 py-3 rounded-md border border-gray-300 dark:border-gray-600 font-medium transition-colors"
                    >
                        {t("explore")}
                    </Link>
                </div>
            </div>

            <div className="md:w-1/2 relative">
                <div className="relative animate__animated animate__bounceInRight">
                    <Image
                        src="/images/coffe-logo.png"
                        alt="Alowishus Coffee Cup"
                        width={600}
                        height={600}
                        className="mx-auto"
                    />

                    <div className="absolute bottom-10 left-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className="w-5 h-5 text-yellow-400 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            4.9 out of 5 Overall Star <br />
                            Rating for All Local Business.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
