import { useQuery } from "@tanstack/react-query";
import { getShifts} from "@/services/shiftService";

export function useShifts() {
    return useQuery({
        queryKey: ["shifts"],
        queryFn: getShifts,
    });
}