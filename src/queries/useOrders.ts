import { fetchOrders } from "@/services/ordersService";
import { useQuery } from "@tanstack/react-query";

export function useOrders(currentPage: number, selectedDate: Date) {
    return useQuery({
        queryKey: ["orders", currentPage, selectedDate], 
        queryFn: () => fetchOrders(currentPage, selectedDate), 
    });
}