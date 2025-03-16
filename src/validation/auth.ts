import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email cannot be empty").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z
    .object({
        fullName: z.string().min(2, "Full name must be at least 2 characters long"),
        email: z.string().min(1, "Email cannot be empty").email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
