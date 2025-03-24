"use client";

import RevenueChart from "@/components/pages/dashboard/RevenueChart";
import StatCard from "@/components/pages/dashboard/StatCard";
import { supabase } from "@/config/supabaseClient";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        revenue: 0,
    });
    const [revenueData, setRevenueData] = useState<{ date: string; total: number }[]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data: users, error: usersError } = await supabase
                .from("users")
                .select("id", { count: "exact" });

            const { data: orders, error: ordersError } = await supabase
                .from("orders")
                .select("id", { count: "exact" });

            const { data: revenue, error: revenueError } = await supabase
                .from("orders")
                .select("total, created_at");

            if (usersError || ordersError || revenueError) {
                console.error("Error fetching data", usersError, ordersError, revenueError);
                return;
            }

            const totalRevenue = revenue?.reduce((sum, order) => sum + order.total, 0) || 0;

            const groupedRevenue = revenue?.reduce((acc, order) => {
                const date = new Date(order.created_at).toISOString().split("T")[0];
                acc[date] = (acc[date] || 0) + order.total;
                return acc;
            }, {} as Record<string, number>);
            const chartData = Object.keys(groupedRevenue).map(date => ({
                date,
                total: groupedRevenue[date],
            }));
            setStats({
                users: users?.length || 0,
                orders: orders?.length || 0,
                revenue: totalRevenue,
            });
            setRevenueData(chartData);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Users" value={stats.users} />
                <StatCard title="Orders" value={stats.orders} />
                <StatCard title="Revenue" value={`$${stats.revenue.toLocaleString()}`} />
            </div>

            <RevenueChart data={revenueData} />
        </div>
    );
}
