"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/config/supabaseClient";
import { LoginFormData, loginSchema } from "@/validation/auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
    const router = useRouter();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const handleLogin = async (data: LoginFormData) => {
        setServerError("");

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setServerError(error.message);
        } else {
            router.push("/");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {serverError && <p className="text-red-500 text-xs mb-4">{serverError}</p>}

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

            <Link href="#" className="text-sm mb-8">Forget Password?</Link>

            <button
                type="submit"
                className="w-full bg-[var(--color-footer)] text-white py-3 rounded-lg"
            >
                Login
            </button>

            <p className="text-center">OR</p>

            <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-lg transition-all duration-300 hover:bg-gray-100 active:scale-95" >
                <FcGoogle size={24} />
                <span className="text-gray-700 font-medium">Login with Google</span>
            </button>

            <p className="text-center text-sm mt-6">
                Dont have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:text-blue-800">
                    Sign up
                </Link>
            </p>
        </form>
    );
}
