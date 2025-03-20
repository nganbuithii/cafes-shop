import { TableType } from "@/components/types/tableType";
import { supabase } from "@/config/supabaseClient";

export const getTables = async () => {
    const { data, error } = await supabase.from("tables").select("*");
    if (error) throw new Error(error.message);
    return data;
};


export const updateTable = async (table: TableType) => {
    const { data, error } = await supabase
        .from("tables")
        .update({
            status: table.status,
        })
        .eq("id", table.id)
        .select()

    if (error) throw new Error(error.message);
    return data;
};