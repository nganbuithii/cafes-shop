"use client";

import { useState } from "react";
import { useUserOrders } from "@/queries/useOrders";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import OrderHistoryFilter from "@/components/pages/history-order/HistoryFilter";
import EmptyOrderState from "@/components/pages/history-order/EmptyOrderState";
import OrderHistoryList from "@/components/pages/history-order/OrderHistoryList";
import { FilterType } from "@/components/types/orderType";

const HistoryOrder = () => {
    const { user } = useAuthStore()
    const userId = user?.id;
   
    const [filter, setFilter] = useState<FilterType>("all");
    const { data: orders, isLoading, error } = useUserOrders(userId || "");

    const filteredOrders = orders?.filter(
        (order) => filter === "all" || order.status === filter
    );

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay error={error} />;
    return (
        <div className="min-h-screen bg-coffee-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="p-6 bg-gradient-to-r from-coffee-600 to-coffee-400 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold">Order History</h2>
                        <p className="mt-1 text-sm opacity-90">Your coffee journey</p>
                    </div>

                    <OrderHistoryFilter filter={filter} setFilter={setFilter} />

                    {filteredOrders && filteredOrders.length > 0 ? (
                        <OrderHistoryList orders={filteredOrders} />
                    ) : (
                        <EmptyOrderState filter={filter} />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default HistoryOrder;