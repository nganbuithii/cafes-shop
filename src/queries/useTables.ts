'use client'
import { getTables } from "@/services/tableService";
import { useQuery } from "@tanstack/react-query";

export function useTables( ) {
    return useQuery({
        queryKey: ["tables"],
        queryFn: getTables,
    });
}
