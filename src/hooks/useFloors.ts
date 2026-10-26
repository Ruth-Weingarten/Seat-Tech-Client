import { useQuery } from "@tanstack/react-query";
import { getFloors } from "../api/office";
import { FLOORS_KEY } from "../api/queryKeys";

export const useFloors = () => {

    return useQuery({
        queryKey: [FLOORS_KEY],
        queryFn: getFloors
    })
}

