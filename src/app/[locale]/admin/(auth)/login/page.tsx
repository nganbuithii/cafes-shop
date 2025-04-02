'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/queries/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/validation/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";

export default function LoginPage() {
    const { login, isLoading, error } = useAuth();
    const router = useRouter();
    const {  setUser } = useAuthStore()

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
            onSuccess: (authData) => {
                setUser(authData?.user);

            const role = authData?.user?.app_metadata?.role;
            // console.log("ROLEEE", role); 
                if (role !== "admin" && role !== "employee") {
                    toast.error("You do not have access!");
                    return;
                }
                router.push("/admin/dashboard");
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input {...register("email")} type="text" placeholder="Username" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

                    <Input {...register("password")} type="password" placeholder="Password" />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>

                    {error && <p className="text-red-500 text-xs">{error}</p>}
                </form>
            </div>
        </div>
    );
}
