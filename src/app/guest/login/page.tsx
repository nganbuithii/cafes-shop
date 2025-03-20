'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GuestLogin() {
    const router = useRouter();
    const [name, setName] = useState('');

    const table = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('table');

    const handleGuestLogin = () => {
        if (!name.trim()) return alert('Vui lòng nhập tên!');

        localStorage.setItem('guestName', name);
        router.push(`/tables/${table}`);
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
                    <Button
                        onClick={handleGuestLogin}
                        className="mt-4 w-full">
                        Countinue
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}