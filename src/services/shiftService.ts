import { supabase } from "@/config/supabaseClient";

export async function getShifts() {
    const { data, error } = await supabase.from("shifts").select("*, users(*)"); 
    if (error) throw error;
    return data;
}

export async function createShift(user_id: string, date: string, shift_time: string) {
    const { data, error } = await supabase
        .from("shifts")
        .insert([{ user_id, date, shift_time, status: "pending" }])
        .select();
    if (error) throw error;
    return data;
}

export async function approveShift(id: string) {
    const { error } = await supabase.from("shifts").update({ status: "approved" }).eq("id", id);
    if (error) throw error;
}
