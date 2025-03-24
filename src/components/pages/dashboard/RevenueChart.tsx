"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueChart({ data }: { data: { date: string; total: number }[] }) {
    return (
        <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">Revenue Statistics</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#4CAF50" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
