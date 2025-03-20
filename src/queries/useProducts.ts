import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productService";

export function useProducts(categories: string[], priceRange?: [number, number]) {
    return useQuery({
        queryKey: ["products", categories, priceRange], 
        queryFn: () => fetchProducts(categories, priceRange),
        
    });
}
