"use client";

import BestSellingCoffee from "@/components/pages/home/BestSellingCoffee";
import ExploreSection from "@/components/pages/home/ExploreSection";
import HeroSection from "@/components/pages/home/HeroSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-8">
      <main>
        <HeroSection />
        <ExploreSection />
        <BestSellingCoffee />
      </main>
    </div>
  );
}