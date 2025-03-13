"use client";

import Link from "next/link";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

export default function Header() {


    return (
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <Link href="/">
                    <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Nanies
                    </span>
                </Link>

                <nav className="hidden md:flex space-x-8">
                    <Link href="/cafe-menu" className="text-black hover:text-pink-300">
                        Cafe Menu
                    </Link>
                    <Link href="/about-us" className="text-black hover:text-pink-300">
                        About Us
                    </Link>
                    <Link href="/find-us" className="text-black hover:text-pink-300">
                        Find Us
                    </Link>
                    <Link href="/catering" className="text-black hover:text-pink-300">
                        Alowishus Catering
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <Link href="/cart" className="relative">
                        <CiShoppingCart className="text-pink-500" size={30} />
                    </Link>


                </div>
            </div>
        </header>
    );
}