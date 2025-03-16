import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productService";

export function useProducts( category: string) {
    return useQuery({
        queryKey: ["products", category],
        queryFn: () => fetchProducts(category),
        
    });
}
