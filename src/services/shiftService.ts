'use server'
import { supabase } from "@/config/supabaseClient";
import { Resend } from "resend";

// Khởi tạo Resend ở đầu file
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
// export async function updateShiftStatus(id: string, status: string) {
//     const { error } = await supabase.from("shifts").update({ status }).eq("id", id);
//     if (error) throw error;
// }
export async function updateShiftStatus(id: string, status: string) {
    const { data: shift, error } = await supabase
        .from("shifts")
        .select("id, date, shift_time, users(email)")
        .eq("id", id)
        .single();

    if (error || !shift) {
        throw new Error("Shift not found");
    }

    const { error: updateError } = await supabase.from("shifts").update({ status }).eq("id", id);
    if (updateError) throw updateError;

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "nganbui.23112003@gmail.com",
            subject: "Shift Status Updated",
            html: `<p>Your shift on <strong>${shift.date}</strong> at <strong>${shift.shift_time}</strong> has been updated to <strong>${status}</strong>.</p>`
        });
    } catch (emailError) {
        console.error("Failed to send email:", emailError);
    }

}
export async function approveShift(id: string) {
    const { error } = await supabase.from("shifts").update({ status: "approved" }).eq("id", id);
    if (error) throw error;
}
