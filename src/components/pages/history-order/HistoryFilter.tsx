import { FilterType } from "@/components/types/orderType";
import React from "react";

interface OrderFilterProps {
    filter: "all" | "completed" | "pending" | "cancelled";
    setFilter: (filter: "all" | "completed" | "pending" | "cancelled") => void;
}

const OrderHistoryFilter: React.FC<OrderFilterProps> = ({ filter, setFilter }) => {
    return (
        <div className="p-4 border-b border-coffee-100">
            <div className="flex flex-wrap gap-2">
                {["all", "completed", "pending", "cancelled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status as FilterType)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === status
                                ? "bg-coffee-500 text-red-700 bg-pink-300"
                                : "bg-coffee-100 text-coffee-700 hover:bg-coffee-200"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryFilter
