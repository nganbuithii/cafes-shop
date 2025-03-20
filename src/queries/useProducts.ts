import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productService";

export function useProducts(categories: string[]) {
    return useQuery({
        queryKey: ["products", categories], 
        queryFn: () => fetchProducts(categories),
        
    });
}
