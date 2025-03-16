'use client'
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import CartSummary from "@/components/pages/cart/CartSummary";
import { CartItemType } from "@/components/types/cartType";
import CartItemCom from "@/components/pages/cart/CartItem";

export default function CartPage() {
    const cartItems = useCartStore((state) => state.cart);
    const { removeFromCart, updateQuantity } = useCartStore();
    const [selectedItem, setSelectedItem] = useState<CartItemType | null>(null);

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
                        <CartItemCom key={item.id} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity}  onConfirmRemove={(selectedItem) => setSelectedItem(selectedItem)} />
                    ))}
                    </div>

                    <CartSummary cartItems={cartItems} />
                </div>)}
                
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
        </div>
    );
}
