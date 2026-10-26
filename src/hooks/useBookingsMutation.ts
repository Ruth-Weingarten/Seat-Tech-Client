import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FLOOR_MAP_KEY } from "../api/queryKeys";



export const useBookingsMutation = <T>(api: (data: T) => Promise<void>,onDone:()=>void) => {
const queryClient = useQueryClient();

    return useMutation<void, Error, T>({
        mutationFn: api,
         onSuccess: async() => {
           await queryClient.invalidateQueries({ queryKey: [FLOOR_MAP_KEY] })
           onDone()
        },
        onError: (error) => {

            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }

        }
    })
}
