import { calculateTotal } from "@/lib/utils";
import { CartItemType } from "@/components/types/cartType";

interface CartSummaryProps {
    cartItems: CartItemType[];
}

export default function CartSummary({ cartItems }: CartSummaryProps) {
    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Total</h3>
            <div className="flex justify-between mt-2">
                <span>Subtotal</span>
                <span>{calculateTotal(cartItems).toLocaleString("vi-VN")} VND</span>
            </div>
            <div className="flex justify-between mt-2">
                <span>Fee Ship</span>
                <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between mt-2 font-bold">
                <span>Total</span>
                <span>{calculateTotal(cartItems).toLocaleString("vi-VN")} VND</span>
            </div>
        </div>
    );
}
