import { CartDrawerProps } from "@/components/types/cartType";
import { calculateTotal } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import CartItemCom from "./CartItem";

export default function CartDrawer({ open, setOpen, cartItems }: CartDrawerProps) {
    const { removeFromCart, updateQuantity } = useCartStore();
    const router = useRouter();
    const { user } = useAuthStore(); 

    const handleCheckout = () => {
        if (!user) {
            router.push("/login");
        } else {
            router.push("/cart");
        }
        setOpen(false);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {open && <div className="fixed inset-0 bg-black/20 z-50" onClick={() => setOpen(false)} />}

            <div
                className={`fixed inset-y-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-lg overflow-auto transition-transform ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-[var(--color-footer)] dark:text-pink-400">Shopping Cart</h2>
                            <span className="inline-flex items-center justify-center bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 text-sm font-medium rounded-full h-6 min-w-[24px] px-2">
                                {totalItems}
                            </span>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-4xl font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                            ×
                        </button>
                    </div>

                    <div className="py-4 border-t border-b dark:border-gray-700">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                Your cart is empty
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <CartItemCom 
                                    key={item.id} 
                                    item={item} 
                                    removeFromCart={removeFromCart} 
                                    updateQuantity={updateQuantity} 
                                />
                            ))
                        )}
                    </div>

                    <div className="py-6 flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
                        <span>Subtotal</span>
                        <span>{calculateTotal(cartItems).toLocaleString("vi-VN")} VND</span>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                        >
                            Continue Shopping
                        </button>
                        <button 
                            onClick={handleCheckout}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 text-white bg-[var(--color-footer)] hover:opacity-90 transition-opacity"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
