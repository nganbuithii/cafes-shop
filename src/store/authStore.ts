import { supabase } from "@/config/supabaseClient";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthState = {
    user: User | null;
    setUser: (user: User | null) => void;
    checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => {

    return {
        user: null,
        setUser: (user) => set({ user }),
        checkAuth: async () => {
            const { data} = await supabase.auth.getUser();
            set({ user: data?.user || null });

            supabase.auth.onAuthStateChange((_event, session) => {
                set({ user: session?.user || null });
            });
        },
    };
});
