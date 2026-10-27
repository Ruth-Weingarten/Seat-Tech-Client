import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee, type UpdateEmployeeResponse } from "../api/employees";
import { EMPLOYEES_KEY, FLOOR_MAP_KEY } from "../api/queryKeys";
import axios from "axios";
export const useUpdateEmployee=()=>
{
const queryClient = useQueryClient();

    return useMutation<UpdateEmployeeResponse, Error, { id: string, isActive: boolean } >({
        mutationFn:updateEmployee ,
         onSuccess: async() => {
        await queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
        await queryClient.invalidateQueries({ queryKey: [FLOOR_MAP_KEY] })
        },
        onError: (error) => {

            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }

        }
    })
}
