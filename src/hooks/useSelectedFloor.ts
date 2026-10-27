import { useState } from "react";
import { useFloors } from "./useFloors";
import { useFloorMap } from "./useFloorMap";

export const useSelectedFloor = () => {
const { data: floors, isLoading, error } = useFloors();
const [selectedId, setSelectedId] = useState<string>("");
const currentId = selectedId || floors?.[0]?.id || ""
const { data: floorsMap, isLoading: isMapLoading, error: mapError } = useFloorMap(currentId);
   return(
    {
        floors:floors,
        floorsMap:floorsMap, 
         currentId:currentId,
        setSelectedId:setSelectedId,
        isLoading: isLoading||isMapLoading,
        error:error??mapError??null
    }
   )
}
