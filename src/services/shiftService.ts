import { supabase } from "@/config/supabaseClient";

// 📌 API: Lấy danh sách lịch làm
export async function getShifts() {
    const { data, error } = await supabase.from("shifts").select("*");
    if (error) throw error;
    return data;
}

// 📌 API: Đăng ký lịch làm
export async function createShift(user_id: string, date: string, shift_time: string) {
    const { data, error } = await supabase
        .from("shifts")
        .insert([{ user_id, date, shift_time, status: "pending" }])
        .select();
    if (error) throw error;
    return data;
}

// 📌 API: Xác nhận lịch làm (Admin duyệt)
export async function approveShift(id: string) {
    const { error } = await supabase.from("shifts").update({ status: "approved" }).eq("id", id);
    if (error) throw error;
}
