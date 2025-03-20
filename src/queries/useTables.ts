'use client'
import { getTables, updateTable } from "@/services/tableService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTables( ) {
    return useQuery({
        queryKey: ["tables"],
        queryFn: getTables,
    });
}
export const useUpdateTable = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTable,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] });
        },
    });
};