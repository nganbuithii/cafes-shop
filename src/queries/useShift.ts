import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createShift, getShifts} from "@/services/shiftService";

export function useShifts() {
    return useQuery({
        queryKey: ["shifts"],
        queryFn: getShifts,
    });


}

export const useAddShift = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ user_id, date, shift_time }: { user_id: string; date: string; shift_time: string }) =>
            createShift(user_id, date, shift_time),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shifts"] }); 
        },
    });
};