import { useQuery } from "@tanstack/react-query";
import { getFloors } from "../api/office";

export const useFloors = () => {

    return useQuery({
        queryKey: ['floors'],
        queryFn: getFloors
    })
}

