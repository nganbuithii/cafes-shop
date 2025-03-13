"use client";

import { CartDrawerProps } from "@/components/types/cartType";
import Image from "next/image";


export default function CartDrawer({ open, setOpen, cartItems }: CartDrawerProps) {
    return (
        <>
            {open && <div className="fixed inset-0 bg-black/20 z-50" onClick={() => setOpen(false)} />}

            <div
                className={`fixed inset-y-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-lg overflow-auto transition-transform ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[var(--color-footer)]">Shopping Cart</h2>
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-8 right-4 text-4xl font-bold text-black"
                        >
                            ×
                        </button>
                    </div>

                    <div className="py-4 border-t border-b">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 mb-6">
                                <div className="h-24 w-24 flex-shrink-0 relative bg-gray-100 rounded">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className="object-contain p-2"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold ">{item.name}</h3>
                                        <button className="text-gray-600 hover:text-red-500">Remove</button>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                                                -
                                            </button>
                                            <span className="px-2">{item.quantity}</span>
                                            <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                                                +
                                            </button>
                                        </div>
                                        <span className="font-bold">{item.price.toLocaleString("vi-VN")} VND</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="py-6 flex justify-between font-bold text-lg">
                        <span>Subtotal</span>
                        <span>
                            {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString("vi-VN")} VND
                        </span>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-gray-300 hover:bg-gray-100"
                        >
                            Continue Shopping
                        </button>
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 text-white bg-[var(--color-footer)]"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
