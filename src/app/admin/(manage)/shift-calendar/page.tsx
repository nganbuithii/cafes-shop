import ShiftCalendar from "@/components/pages/shift/ShiftCalendar";
import ShiftAdmin from "./manager/page";


export default function ShiftCalendarPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold">Employee Schedule Management  </h1>
            <ShiftCalendar />
            <ShiftAdmin />
        </div>
    );
}
