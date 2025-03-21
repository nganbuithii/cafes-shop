import { supabase } from "@/config/supabaseClient";
import { CartItemType } from "@/components/types/cartType";

export const placeOrder = async ({ userId, cartItems, address }: { userId: string; cartItems: CartItemType[]; address: string }) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const { data, error } = await supabase
        .from("orders")
        .insert([
            {
                user_id: userId,
                items: cartItems,
                total: totalPrice,
                status: "pending",
                address: address,
                created_at: new Date(),
            },
        ])
        .select();

    if (error) {
        throw new Error("Errror while placing order.Try again");
    }

    return data;
};
