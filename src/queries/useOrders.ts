import { fetchOrders, updateOrderStatus } from "@/services/ordersService";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useOrders(currentPage: number, selectedDate: Date) {
    return useQuery({
        queryKey: ["orders", currentPage, selectedDate], 
        queryFn: () => fetchOrders(currentPage, selectedDate), 
    });
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, newStatus }: { orderId: string; newStatus: string }) =>
            updateOrderStatus(orderId, newStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] }); 
        },
    });
}
