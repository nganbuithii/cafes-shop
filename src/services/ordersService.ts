// src/services/ordersService.ts
import { supabase } from "@/config/supabaseClient";

const PAGE_SIZE = 5;

export const fetchOrders = async (page: number) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
        .from("orders")
        .select("*", { count: "exact" }) // Lấy tổng số đơn hàng
        .order("created_at", { ascending: false })
        .range(start, end);

    if (error) {
        throw new Error(error.message);
    }

    const ordersWithUsers = await Promise.all(
        data.map(async (order) => {
            const { data: userData } = await supabase
                .from("users") 
                .select("email, full_name")
                .eq("id", order.user_id)
                .single();

            return { ...order, user: userData };
        })
    );

    return { orders: ordersWithUsers, total: count || 0 }; // Trả về tổng số đơn hàng thực tế
};

