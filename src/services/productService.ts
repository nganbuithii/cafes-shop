import { supabase } from "@/config/supabaseClient";
import { Product } from "@/components/types/productType";

export const fetchProducts = async (category: string): Promise<Product[]> => {

    let query = supabase
        .from("products")
        .select("id, name, description, price, image_url, category")
        .order("price", { ascending: false })

    if (category !== "All") {
        query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) {
        throw new Error("Failed to fetch products");
    }

    return data || [];
};
