"use client";

import { loginUser } from "@/services/authService";
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

    return {
        login: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error ? mutation.error.message : null,
    };
}
