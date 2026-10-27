import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { EMPLOYEES_KEY, FLOOR_MAP_KEY, FLOORS_KEY } from "../api/queryKeys";



export const useMapMutation = <T>(api: (data: T) => Promise<void>,onDone:()=>void) => {
const queryClient = useQueryClient();

    return useMutation<void, Error, T>({
        mutationFn: api,
         onSuccess: async() => {
           await queryClient.invalidateQueries({ queryKey: [FLOOR_MAP_KEY] })
            await queryClient.invalidateQueries({ queryKey: [FLOORS_KEY] })
            await queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
           onDone()
        },
        onError: (error) => {

            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }

        }
    })
}
