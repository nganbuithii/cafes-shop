import { loginUser, logoutUser, registerUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export function useAuth() {

    const mutation = useMutation({
        mutationFn: loginUser,
    });
    const registerMutation = useMutation({
        mutationFn: registerUser,
    });
    return {
        login: mutation.mutate,
        registerUser: registerMutation.mutate,
        isLoading: mutation.isPending,
        isRegisterLoading: registerMutation.isPending,
        error: mutation.error ? mutation.error.message : registerMutation.error?.message || null,
        logout: logoutUser, 
    };
}
