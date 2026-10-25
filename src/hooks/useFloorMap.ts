import { useQuery } from "@tanstack/react-query"
import { getFloorMap } from "../api/office"

export const useFloorMap = (id:string) => {

    return useQuery({
        queryKey: ['floorMap',id],
        queryFn:()=>{return getFloorMap(id)},
        enabled:!!id
    })
}