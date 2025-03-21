'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/queries/useAuth';
import { generateRandomPassword } from '@/lib/utils';

export default function GuestLogin() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { registerUser, isRegisterLoading } = useAuth();


    const handleGuestLogin = async () => {
        if (!name.trim()) {
            setError("Please enter your name!");
            return;
        }

        const guestEmail = `${name.toLowerCase().replace(/\s+/g, "_")}@guest.com`;
        const randomPassword = generateRandomPassword(16);

        registerUser(
            {
                email: guestEmail,
                password: randomPassword,
                confirmPassword: randomPassword,
                fullName: name,
            },
            {
                onSuccess: () => {
                    router.push(`/products`);
                },
                onError: (error) => {
                    setError(error.message || "Failed to register guest.");
                },
            }
        );
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px] p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">My name</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        placeholder="Enter your name.."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                    <Button
                        onClick={handleGuestLogin}
                        className="mt-4 w-full">
                        {isRegisterLoading ? "Loading..." : "Continue"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}