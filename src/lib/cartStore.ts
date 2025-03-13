"use client";

import { create } from "zustand";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === product.id);
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
        })),
    updateQuantity: (id, quantity) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ),
        })),
    clearCart: () => set({ cart: [] }),
}));