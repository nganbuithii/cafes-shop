// src\services\authService.ts
import { LoginFormData } from "@/validation/auth";

export async function loginUser(data: LoginFormData) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.error || "Login Fail!");
    }

    return result;
}

