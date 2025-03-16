// src\services\authService.ts
import { supabase } from "@/config/supabaseClient";
import { LoginFormData } from "@/validation/auth";

export async function loginUser(data: LoginFormData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    });

    if (error) {
        throw new Error(error.message || "Login Fail!");
    }

    return authData; 
}

