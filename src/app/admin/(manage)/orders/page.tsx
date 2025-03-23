'use client';
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useOrders, useUpdateOrderStatus } from "@/queries/useOrders";
import PaginationControls from "@/components/Pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { toast } from "react-toastify";
import { listenToNewOrders } from "@/services/ordersService";
import { useQueryClient } from "@tanstack/react-query";

export default function OrdersPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { data, isLoading } = useOrders(currentPage, selectedDate);
    const orders = data?.orders || [];
    const totalOrders = data?.total || 0;

    const PAGE_SIZE = 5;
    const totalPages = Math.ceil(totalOrders / PAGE_SIZE);
    const updateOrderStatusMutation = useUpdateOrderStatus();
    const queryClient = useQueryClient();

    useEffect(() => {
        const channel = listenToNewOrders((newOrder) => {
            toast(`🔔 New Order #${newOrder.id} has been placed!`);
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        });

        return () => {
            channel.unsubscribe();
        };
    }, [queryClient]);

    const handleChangeStatus = (orderId: string, newStatus: string) => {
        updateOrderStatusMutation.mutate(
            { orderId, newStatus },
            {
                onSuccess: () => {
                    toast.success(`Update status ${newStatus} of order #${orderId} successfully!`);
                },
                onError: () => {
                    toast.error(`Error something when change status ${newStatus} of order #${orderId}!`);
                },
            }
        );
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders Management</h1>
            <div className="flex items-center gap-4">
                <label className="text-gray-700 font-semibold">Select Date:</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>

                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(day) => {
                                if (day) {
                                    setSelectedDate(day);
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>

            </div>
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
                                        <Select
                                            defaultValue={order.status}
                                            onValueChange={(newStatus) => handleChangeStatus(order.id, newStatus)}
                                        >
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue placeholder="Change status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="cooking">Cooking</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
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