"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShiftFormDrawerProps } from "@/components/types/shiftType";
import { useAddShift } from "@/queries/useShift";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";

export function ShiftFormDrawer({ date, isOpen, onClose }: ShiftFormDrawerProps) {
    if (!date) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign up shift work</DialogTitle>
                    <DialogDescription>Select your shift information</DialogDescription>
                </DialogHeader>
                <ShiftForm date={date} onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
}

function ShiftForm({ date, className, onClose }: { date: string; className?: string; onClose: () => void }) {
    const addShift = useAddShift();
    const { user } = useAuthStore();
    const userId = user?.id;

    const [shiftTime, setShiftTime] = React.useState(""); 
    const [error, setError] = React.useState(""); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 

        if (!userId || !date || !shiftTime) {
            setError("Please select a shift time!");
            return;
        }

        addShift.mutate(
            { user_id: userId, date, shift_time: shiftTime },
            {
                onSuccess: () => {
                    onClose();
                    toast.success("Shift registered successfully! 🎉");
                },
                onError: () => {
                    toast.error("Failed to register shift. Please try again.");
                },
            }
        );
    };

    return (
        <form className={`grid gap-4 ${className}`} onSubmit={handleSubmit}>
            <div className="grid gap-2">
                <Label>Workday</Label>
                <Input type="text" value={date} readOnly />
            </div>
            <div className="grid gap-2">
                <Label>Select shift</Label>
                <select
                    className="border rounded-md p-2"
                    value={shiftTime}
                    onChange={(e) => setShiftTime(e.target.value)}
                >
                    <option value="">Select shift</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="night">Evening</option>
                </select>
                {error && <p className="text-red-500 text-sm">{error}</p>} 
            </div>
            <Button type="submit" className="bg-pink-500 hover:bg-pink-300">Sign up shift</Button>
        </form>
    );
}
