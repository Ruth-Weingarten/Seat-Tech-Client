import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { MY_BOOKINGS_KEY } from "../api/queryKeys"
import { getMyBookings } from "../api/booking"

export const useMyBookings = (page: number) => {

    return useQuery({
        queryKey: [MY_BOOKINGS_KEY, page],
        queryFn: () => getMyBookings(page),
        placeholderData: keepPreviousData
    })
}