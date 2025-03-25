"use client";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, X, Clock } from "lucide-react";
import { useUpdateShiftStatus } from "@/queries/useShift";
import { toast } from "react-toastify";

export function ShiftStatusPopover({ shiftId, currentStatus }: { shiftId: string; currentStatus: string }) {
    const [loading, setLoading] = useState(false);
    const { mutate: updateShiftStatus } = useUpdateShiftStatus();
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        setLoading(true);
        updateShiftStatus(
            { id: shiftId, status: newStatus },
            {
                onSuccess: () => {
                    toast.success(`Changed status shift ID ${shiftId} to ${newStatus}`);
                    setIsOpen(false);
                },
                onError: (error) => {
                    console.error("Update Shift Status Error:", error);
                    toast.error(`ERROR: Failed to change shift ID ${shiftId} to ${newStatus}`);
                },
                onSettled: () => setLoading(false),
            }
        );
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
                className="flex items-center gap-2 text-white text-xs font-medium p-1 rounded-md"
                onClick={() => setIsOpen((prev) => !prev)} 
            >
                {currentStatus === "pending" && <Clock className="text-yellow-500" size={14} />}
                {currentStatus === "approved" && <Check className="text-green-500" size={14} />}
                {currentStatus === "rejected" && <X className="text-red-500" size={14} />}
            </PopoverTrigger>
            <PopoverContent className="p-2 flex flex-col gap-1">
                <Button variant="ghost" onClick={() => handleStatusChange("pending")} disabled={loading}>
                    🟡 Pending
                </Button>
                <Button variant="ghost" onClick={() => handleStatusChange("approved")} disabled={loading}>
                    ✅ Approved
                </Button>
                <Button variant="ghost" onClick={() => handleStatusChange("rejected")} disabled={loading}>
                    ❌ Rejected
                </Button>
            </PopoverContent>
        </Popover>
    );
}
