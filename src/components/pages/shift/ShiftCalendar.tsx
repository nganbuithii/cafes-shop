"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { useShifts } from "@/queries/useShift";
import { ShiftEvent } from "@/components/types/shiftType";
import { ShiftFormDrawer } from "./ShiftFormDrawer";
import { getEventColor } from "@/lib/utils";
import { ShiftStatusPopover } from "./ShiftStatusDropdown";
import { useAuthStore } from "@/store/authStore";

export default function ShiftCalendar() {
    const { data: shifts, isLoading } = useShifts();
    const { user } = useAuthStore()
    const isAdmin = user?.app_metadata?.role === "admin";
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    const events: ShiftEvent[] =
        shifts?.map((shift) => ({
            id: shift.id,
            title: `${shift.users.email} - ${shift.shift_time} (${shift.status})`,
            start: shift.date,
            color: getEventColor(shift.status),
        })) || [];

    const handleDateClick = (info: DateClickArg) => {
        const today = new Date().toISOString().split("T")[0];
        if (info.dateStr < today) return;

        setSelectedDate(info.dateStr);
        setIsFormOpen(true);
    };


    if (isLoading) return <p className="text-center text-gray-500">Loading ...</p>;


    return (
        <Card className="p-4 shadow-lg rounded-2xl">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                validRange={undefined}
                eventContent={(eventInfo) => {
                    const status = eventInfo.event.title.split("(")[1]?.replace(")", "");

                    return (
                        <div className="p-1 rounded-md text-white text-xs font-medium flex flex-col gap-1">
                            {isAdmin && (
                                <ShiftStatusPopover shiftId={eventInfo.event.id} currentStatus={status} />
                            )}
                            <span className="whitespace-normal break-words">{eventInfo.event.title}</span>
                        </div>
                    );
                }}


                height="auto"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek",
                }}
                buttonText={{
                    today: "Today",
                    month: "Month",
                    week: "Week",
                }}
            />

            <ShiftFormDrawer
                date={selectedDate}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />
        </Card>
    );
}
