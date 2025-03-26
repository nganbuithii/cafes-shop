import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail, fetchProducts } from "@/services/productService";

export function useProducts(categories?: string[], priceRange?: [number, number]) {
    return useQuery({
        queryKey: ["products", categories, priceRange], 
        queryFn: () => fetchProducts(categories, priceRange),
        
    });
}
export function useProductDetail(id: number) {
    return useQuery({
      queryKey: ["product", id],
      queryFn: () => fetchProductDetail(id),
      enabled: !!id, 
    });
  }