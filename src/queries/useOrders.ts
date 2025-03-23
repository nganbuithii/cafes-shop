import { fetchOrders } from "@/services/ordersService";
import { useQuery } from "@tanstack/react-query";

export function useOrders(currentPage: number) {
    return useQuery({
        queryKey: ["orders", currentPage], 
        queryFn: () => fetchOrders(currentPage),
    });
}
