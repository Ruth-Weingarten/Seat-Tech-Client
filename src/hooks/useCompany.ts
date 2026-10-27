import { useQuery } from "@tanstack/react-query"
import { getCompany } from "../api/employees"
import { COMPANY_KEY } from "../api/queryKeys"

export const useCompany = () => {
    return useQuery({
        queryKey: [COMPANY_KEY],
        queryFn: getCompany
    })
}