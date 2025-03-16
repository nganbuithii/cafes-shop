
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
                            <CartItemCom key={item.id} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                        ))}
                    </div>

                    <div className="py-6 flex justify-between font-bold text-lg">
                        <span>Subtotal</span>
                        <span>{calculateTotal(cartItems).toLocaleString("vi-VN")} VND</span>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-gray-300 hover:bg-gray-100"
                        >
                            Continue Shopping
                        </button>
                        <button onClick={handleCheckout}
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
