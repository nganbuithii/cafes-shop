"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({ title, value }: { title: string; value: number | string }) {
    return (
        <Card className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </CardContent>
        </Card>
    );
}
