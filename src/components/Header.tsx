"use client";

import Link from "next/link";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import CartDrawer from "./pages/cart/CartDrawer";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/queries/useAuth";
import { useAuthStore } from "@/store/authStore";
import DarkModeToggle from "./dark-mode-toggle";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { logout } = useAuth();
    const { cart } = useCartStore();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const { user } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40 w-full">
            <div className="container mx-auto flex items-center justify-between py-2 px-6">
                <Link href="/">
                    <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Nanies
                    </span>
                </Link>

                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
                </button>

                <nav
                    className={`md:flex md:space-x-6 fixed md:static top-14 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 ${menuOpen ? "flex flex-col md:flex-row" : "hidden md:flex"
                        }`}
                >
                    <Link href="/" className="block py-2 mt-2 md:inline text-black hover:text-pink-300">
                        Home
                    </Link>
                    <Link href="/about-us" className="block py-2 mt-2 md:inline text-black hover:text-pink-300">
                        About Us
                    </Link>
                    <Link href="/products" className="block py-2 mt-2 md:inline text-black hover:text-pink-300">
                        Products
                    </Link>
                    <Link href="/history-order" className="block py-2 mt-2 md:inline text-black hover:text-pink-300">
                        History order
                    </Link>
                    <Link href="/map" className="block py-2 mt-2 md:inline text-black hover:text-pink-300">
                        Find us
                    </Link>
                    <div className="py-2 mt-2 md:inline">
                        <DarkModeToggle />
                    </div>
                    <button onClick={() => setOpen(true)} className="relative md:inline block py-2">
                        <CiShoppingCart className="text-pink-500" size={30} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-200 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </nav>


                <div className="hidden md:flex items-center space-x-4">
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