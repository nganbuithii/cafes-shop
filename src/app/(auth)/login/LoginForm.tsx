"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/validation/auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/queries/useAuth";
import { signinWithGoogle } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { login, isLoading, error } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        if (isLoading) return;
        login(data, {
            onSuccess: () => {
                router.push("/");
            },
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}


            <Link href="#" className="text-sm mb-8">Forget Password?</Link>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-blue-400"
            >
                {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center">OR</p>

            <button type="button" className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-lg transition-all duration-300 hover:bg-gray-100 active:scale-95" onClick={() => signinWithGoogle()}
            >
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
