'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Dashboard() {
    const router = useRouter();
    const { user } = useAuthStore()


    return (
        <div className="flex min-h-screen bg-gray-50 w-full">
            <Sidebar className="w-64 bg-black shadow-md p-4 !important">
                <div className="flex flex-col h-full justify-between bg-black p-4">
                    <div className="space-y-4">
                        <Button variant="ghost" className="w-full bg-amber-50 text-left text-lg py-2" onClick={() => router.push("/admin/dashboard")}>
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full bg-amber-50 text-left text-lg py-2" onClick={() => router.push("/admin/tables")}>
                            Table
                        </Button>
                    </div>

                    <div className="text-white">Welcome, {user?.email}</div>
                </div>
            </Sidebar>



            <main className="flex-1 p-8">
                <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-700">Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-gray-900">150</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-700">Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-gray-900">320</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-700">Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-green-600">$12,500</p>
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    );
}
