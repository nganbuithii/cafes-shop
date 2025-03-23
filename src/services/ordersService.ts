import { OrderType } from './../components/types/orderType';
import { OrderStatusType } from "@/components/types/orderType";
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

export const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

    if (error) {
        throw new Error("Error updating order status");
    }
};
export function listenToOrderUpdates(callback: (status: OrderStatusType, userId: string, orderId: string) => void) {
    return supabase
        .channel("orders")
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, (payload) => {
            const updatedOrder = payload.new;
            callback(updatedOrder.status, updatedOrder.user_id, updatedOrder.id);
        })
        .subscribe();
}
export function listenToNewOrders(callback: (order: OrderType) => void) {
    return supabase
        .channel("orders-insert")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
            if (payload.new && typeof payload.new === "object") {
                const newOrder: OrderType = {
                    id: payload.new.id,
                    user_id: payload.new.user_id,
                    status: payload.new.status,
                    created_at: payload.new.created_at,
                    total: payload.new.total,
                    items: payload.new.items || [],
                    table_id: payload.new.table_id || null,
                };
                callback(newOrder);
            }
        })
        .subscribe();
}
