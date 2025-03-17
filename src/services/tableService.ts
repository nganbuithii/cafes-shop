import { supabase } from "@/config/supabaseClient";

export const getTables = async () => {
    const { data, error } = await supabase.from("tables").select("*");
    if (error) throw new Error(error.message);
    return data;
};