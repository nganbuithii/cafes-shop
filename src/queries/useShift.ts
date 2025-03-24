import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createShift, getShifts, updateShiftStatus} from "@/services/shiftService";

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

export const useUpdateShiftStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => updateShiftStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shifts"] }); 
        },
    });
};