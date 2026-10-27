import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newJoinCode, type JoinCodeResponse } from "../api/employees"
import type { Company } from "../types/user"
import { COMPANY_KEY } from "../api/queryKeys"

export const useNewJoinCode = () => {
    const queryClient = useQueryClient()

    return useMutation<JoinCodeResponse, Error, void>({
        mutationFn: newJoinCode,
        onSuccess: (response) => {
            queryClient.setQueryData<Company>([COMPANY_KEY], (old) =>
                old ? { ...old, joinCode: response.joinCode } : old
            )
        }
    })
}