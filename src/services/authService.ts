// src\services\authService.ts
import { supabase } from "@/config/supabaseClient";
import { useAuthStore } from "@/store/authStore";
import { LoginFormData } from "@/validation/auth";

export async function loginUser(data: LoginFormData) {
    const { setUser } = useAuthStore.getState(); 
    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    });

    if (error) {
        throw new Error(error.message || "Login Fail!");
    }
    setUser(authData?.user || null);
    return authData; 
}

export async function logoutUser() {
    const { setUser } = useAuthStore.getState(); 

    await supabase.auth.signOut();
    setUser(null);
}