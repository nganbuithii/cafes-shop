import { supabase } from "@/config/supabaseClient";
import { Product } from "@/components/types/productType";

export const fetchProducts = async (categories?: string[], priceRange?: [number, number]): Promise<Product[]> => {

    let query = supabase
        .from("products")
        .select("id, name, description, price, image_url, category")
        .order("price", { ascending: false })

    if (categories && categories.length > 0 && !categories.includes("All")) {
        query = query.in("category", categories);
    }

    if (priceRange) {
        query = query
            .gte("price", priceRange[0])
            .lte("price", priceRange[1]);
    }

    const { data, error } = await query;
    if (error) {
        throw new Error("Failed to fetch products");
    }

    return data || [];
};
export const fetchProductDetail = async (id: number): Promise<Product> => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        throw new Error("Failed to fetch product detail or product not found");
    }

    return data;
};