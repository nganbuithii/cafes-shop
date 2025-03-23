"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { useShifts } from "@/queries/useShift";
import { Tooltip } from "react-tooltip";
import { ShiftEvent } from "@/components/types/shiftType";
import { ShiftFormDrawer } from "./ShiftFormDrawer";

export default function ShiftCalendar() {
    const { data: shifts, isLoading } = useShifts();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const events: ShiftEvent[] =
        shifts?.map((shift) => ({
            id: shift.id,
            title: `${shift.shift_time} (${shift.status})`,
            start: shift.date,
            color: shift.status === "approved" ? "green" : "orange",
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
                eventContent={(eventInfo) => (
                    <div
                        className="p-1 rounded-md text-white text-sm"
                        style={{ backgroundColor: eventInfo.event.backgroundColor }}
                        data-tooltip-id={eventInfo.event.id}
                    >
                        {eventInfo.event.title}
                        <Tooltip id={eventInfo.event.id} place="top">
                            Day: {eventInfo.event.startStr}
                        </Tooltip>
                    </div>
                )}
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
