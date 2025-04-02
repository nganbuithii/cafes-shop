"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/validation/auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/queries/useAuth";

export default function RegisterForm() {
    const { registerUser, isRegisterLoading, error } = useAuth();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        if (isRegisterLoading) return;
        registerUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName")}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
            </div>

            <div>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

            <button
                type="submit"
                disabled={isRegisterLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-blue-400"
            >
                {isRegisterLoading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="text-center">OR</p>

            <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-lg transition-all duration-300 hover:bg-gray-100 active:scale-95"
            >
                <FcGoogle size={24} />
                <span className="text-gray-700 font-medium">Sign Up with Google</span>
            </button>

            <p className="text-center text-sm mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-800 ">
                    Login
                </Link>
            </p>
        </form>
    );
}
