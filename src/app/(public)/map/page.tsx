"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
});

export default function Home() {
    return (
        <div className=" w-full mx-auto mt-12 py-12 px-6 bg-white dark:bg-black">
            <h1 className="text-4xl font-bold text-center mb-8">Welcome to Nanies Cafe</h1>
            <div className="max-w-2xl mx-auto">
                <Map />
            </div>
        </div>
    );
}