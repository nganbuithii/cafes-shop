"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    return (
        <div>
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
        </div>
    );
}
