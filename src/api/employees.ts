import type { Page } from "../types/auth"
import type { EmployeesQuery } from "../types/employees"
import type { Company, User } from "../types/user"
import { api } from "./client"

export const getEmployees = async (query:EmployeesQuery): Promise<Page<User>> => {

    const response = await api.get<Page<User>>('/api/employees',{ params: query })
    return response.data
}
export const getCompany=async (): Promise<Company> => {

    const response = await api.get<Company>('/api/company')
    return response.data
}
export interface JoinCodeResponse { joinCode: string }

export const newJoinCode = async (): Promise<JoinCodeResponse> => {
    const response = await api.post<JoinCodeResponse>('/api/company/join-code')
    return response.data
}
export interface UpdateEmployeeResponse { employee: User; cancelledBookings: number }

export const updateEmployee= async({ id, isActive }: { id: string, isActive: boolean }): Promise<UpdateEmployeeResponse>=>
{
   const response= await api.patch(`/api/employees/${id}`,{isActive})
   return response.data
}
