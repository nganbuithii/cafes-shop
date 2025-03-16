'use client'
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import CartSummary from "@/components/pages/cart/CartSummary";
import { CartItemType } from "@/components/types/cartType";
import CartItemCom from "@/components/pages/cart/CartItem";
import { useAuthStore } from "@/store/authStore";
import { ToastContainer } from "react-toastify";
import { useCart } from "@/queries/useCart";
type PaymentMethodType = "cod" | "vnpay" | "momo";
export default function CartPage() {
    const cartItems = useCartStore((state) => state.cart);
    const { removeFromCart, updateQuantity } = useCartStore();
    const [selectedItem, setSelectedItem] = useState<CartItemType | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState(false);
    const { placeOrder } = useCart();

    const { user } = useAuthStore();
    const handleCheckout = () => {
        if (!address.trim()) {
            setAddressError(true);
            return;
        }
        setAddressError(false);
        placeOrder({ userId: user!.id, cartItems, address });
        
    };
    return (
        <div className="max-w-5xl mx-auto mt-10 p-4">
            <h2 className="text-xl font-semibold mb-4">CART</h2>
            {cartItems.length === 0 ? (
                <div className="text-center bg-white p-6 rounded-lg shadow-md py-10">
                    <p className="text-lg font-medium">Your cart is empty! 🛒</p>
                    <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                        Return homepage
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-white p-4 shadow-md rounded-lg">
                        {cartItems.map((item) => (
                            <CartItemCom key={item.id} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} onConfirmRemove={(selectedItem) => setSelectedItem(selectedItem)} />
                        ))}
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                        <CartSummary cartItems={cartItems} />

                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <h3 className="font-semibold mb-2">Delivery Address</h3>
                            <input
                                type="text"
                                placeholder="Enter your address"
                                className={`w-full p-2 border rounded ${addressError ? "border-red-500" : "border-gray-300"}`}
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    if (e.target.value.trim()) setAddressError(false);
                                }}
                            />
                            {addressError && <p className="text-red-500 text-sm mt-1">Please enter your delivery address.</p>}

                        </div>

                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <h3 className="font-semibold mb-2">Payment Method</h3>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={() => setPaymentMethod("cod")}
                                    />
                                    Cash on Delivery
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="vnpay"
                                    />
                                    VNPay
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="momo"
                                    />
                                    MoMo
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={!!selectedItem}
                title="Confirm Deletion"
                description={`Are you sure you want to remove ${selectedItem?.name} from your cart?`}
                onConfirm={() => {
                    if (selectedItem) {
                        removeFromCart(selectedItem.id);
                        setSelectedItem(null);
                    }
                }}
                onCancel={() => setSelectedItem(null)}
            />
            <ToastContainer />
        </div>
    );
}
