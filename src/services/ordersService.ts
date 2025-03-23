import { supabase } from "@/config/supabaseClient";
import { format } from "date-fns";

const PAGE_SIZE = 5;

export const fetchOrders = async (page: number, selectedDate: Date) => {
    const start = (page - 1) * PAGE_SIZE;
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const end = start + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
        .from("orders")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(start, end)
        .gte("created_at", `${formattedDate} 00:00:00`)
        .lte("created_at", `${formattedDate} 23:59:59`);

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

    return { orders: ordersWithUsers, total: count || 0 };
};