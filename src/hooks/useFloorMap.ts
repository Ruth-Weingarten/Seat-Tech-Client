import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getFloorMap } from "../api/office"
import { FLOOR_MAP_KEY } from "../api/queryKeys"

export const useFloorMap = (id:string) => {

    return useQuery({
        queryKey: [FLOOR_MAP_KEY,id],
        queryFn:()=>{return getFloorMap(id)},
        enabled:!!id,
        placeholderData: keepPreviousData
    })
}