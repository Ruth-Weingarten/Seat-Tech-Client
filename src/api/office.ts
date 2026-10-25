import type { Floor, FloorMap } from "../types/office"
import { api } from "./client"

export const getFloors = async (): Promise<Floor[]> => {

    const response = await api.get<Floor[]>('/api/floors')
    return response.data
}

export const getFloorMap = async (floorId: string): Promise<FloorMap> => {
    const response = await api.get<FloorMap>(`api/floors/${floorId}/map`)
    return response.data
}