import type { CreateDeskForm, EditDeskForm } from "../schemas/Desk.Schema"
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

export const createDesk = async (newDesk: CreateDeskForm): Promise<void> => {
    await api.post('/api/desks', newDesk)
}
export const updateDesk = async ({id,data}:{id:string,data:EditDeskForm}): Promise<void> => {
    await api.patch(`/api/desks/${id}`, data)
}
export const OS_VALUES = ["WINDOWS", "MACOS", "LINUX"] as const;
export const ROTATIONS = [0, 90, 180, 270] as const;
export const DESK_STATUSES = ["ACTIVE", "MAINTENANCE"] as const;
export const SOFTWARE_VALUES = ["VS_CODE", "VISUAL_STUDIO", "INTELLIJ", "DOCKER", "FIGMA", "OFFICE", "POSTMAN"] as const;
export const ACCESSIBILITY_VALUES = ["WHEELCHAIR_ACCESSIBLE", "ADJUSTABLE_HEIGHT", "ERGONOMIC_CHAIR", "LARGE_MONITOR"] as const;