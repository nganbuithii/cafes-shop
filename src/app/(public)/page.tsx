"use client";

import BestSellingCoffee from "@/components/pages/home/BestSellingCoffee";
import ExploreSection from "@/components/pages/home/ExploreSection";
import HeroSection from "@/components/pages/home/HeroSection";

export default function Home() {
  return (
    <div className="pt-8 bg-white dark:bg-black w-full">
      <main>
        <HeroSection />
        <ExploreSection />
        <BestSellingCoffee />
      </main>
    </div>
  );
}