'use client';
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useOrders } from "@/queries/useOrders";
import PaginationControls from "@/components/Pagination";

export default function OrdersPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useOrders(currentPage);
    const orders = data?.orders || [];
    const totalOrders = data?.total || 0;

    const PAGE_SIZE = 5;
    const totalPages = Math.ceil(totalOrders / PAGE_SIZE);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders Management</h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 text-lg">Loading orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 rounded-lg border">
                    <p className="text-gray-600 text-lg">No orders found.</p>
                </div>
            ) : (
                <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold text-gray-700">ID</TableHead>
                                <TableHead className="font-semibold text-gray-700">User</TableHead>
                                <TableHead className="font-semibold text-gray-700">Table ID</TableHead>
                                <TableHead className="font-semibold text-gray-700">Items</TableHead>
                                <TableHead className="font-semibold text-gray-700">Total</TableHead>
                                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                                <TableHead className="font-semibold text-gray-700">Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.user.email}</TableCell>
                                    <TableCell>{order.table_id || "Offline Order"}</TableCell>
                                    <TableCell>
                                        {order.items && order.items.length > 0 ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {order.items.map((item: { name: string }, index: number) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
                                                    >
                                                        {item.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 text-sm">No items</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium text-green-600">
                                        ${order.total.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${order.status === "completed"
                                                    ? "bg-green-100 text-green-700 border-green-300"
                                                    : order.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                                        : "bg-red-100 text-red-700 border-red-300"
                                                }`}
                                        >
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {format(new Date(order.created_at), "dd/MM/yyyy HH:mm")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}