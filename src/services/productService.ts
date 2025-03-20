import { supabase } from "@/config/supabaseClient";
import { Product } from "@/components/types/productType";

export const fetchProducts = async (categories: string[]): Promise<Product[]> => {

    let query = supabase
        .from("products")
        .select("id, name, description, price, image_url, category")
        .order("price", { ascending: false })

    if (categories.length > 0 && !categories.includes("All")) {
        query = query.in("category", categories);
    }

    const { data, error } = await query;
    if (error) {
        throw new Error("Failed to fetch products");
    }

    return data || [];
};
