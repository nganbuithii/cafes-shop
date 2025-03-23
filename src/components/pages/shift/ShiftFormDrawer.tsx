"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShiftFormDrawerProps } from "@/components/types/shiftType";

export function ShiftFormDrawer({ date, isOpen, onClose }: ShiftFormDrawerProps) {
    if (!date) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign up shift work </DialogTitle>
                    <DialogDescription>Select your shift information </DialogDescription>
                </DialogHeader>
                <ShiftForm date={date} />
            </DialogContent>
        </Dialog>
    )
}

function ShiftForm({ date, className }: { date: string; className?: string }) {
    return (
        <form className={`grid gap-4 ${className}`}>
            <div className="grid gap-2">
                <Label>Workday                </Label>
                <Input type="text" value={date} readOnly />
            </div>
            <div className="grid gap-2">
                <Label>Select shift                </Label>
                <select className="border rounded-md p-2">
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="night">Evening</option>
                </select>
            </div>
            <Button type="submit" className="bg-pink-500 hover:bg-pink-300">Đăng ký</Button>
        </form>
    );
}
