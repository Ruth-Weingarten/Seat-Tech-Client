import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getEmployees } from "../api/employees"
import type { EmployeesQuery } from "../types/employees"
import { EMPLOYEES_KEY } from "../api/queryKeys"

export const useEmployees = (query: EmployeesQuery) => {

    return useQuery({
        queryKey: [EMPLOYEES_KEY,query],
        queryFn: () => getEmployees(query),
        placeholderData: keepPreviousData
    })
}