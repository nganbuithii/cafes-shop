"use client";

import Link from "next/link";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import CartDrawer from "./pages/cart/CartDrawer";
import { useCartStore } from "@/store/cartStore";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "@/queries/useAuth";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
    const [open, setOpen] = useState(false);
    const { logout } = useAuth();
    const { cart } = useCartStore();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const { user } = useAuthStore();

    const handleLogout =  () => {
        logout()
    };

    return (
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40">
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
                    <button onClick={() => setOpen(true)} className="relative">
                        <CiShoppingCart className="text-pink-500" size={30} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-200 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </nav>


                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-700">Welcome, {user.email}</span>
                            <button onClick={handleLogout} className="text-pink-500">
                                <FiLogOut size={20} />
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="text-sm text-blue-500">
                            Login
                        </Link>
                    )}

                </div>
            </div>

            <CartDrawer open={open} setOpen={setOpen} cartItems={cart} />

        </header>
    );
}