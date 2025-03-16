
import { loginUser, logoutUser, registerUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export function useAuth() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            router.push("/");
        },
    });
    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            router.push("/"); 
        },
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
