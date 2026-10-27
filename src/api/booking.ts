import type { Page } from "../types/auth";
import type { Booking } from "../types/bookings";
import { api } from "./client";
export const bookDesk = async (deskId: string): Promise<void> => {
    await api.post('/api/bookings', { deskId })
}
export const replaceBooking = async ({bookingId, deskId}: {bookingId:string,deskId:string}): Promise<void> => {
    await api.post(`/api/bookings/${bookingId}/replace`,{deskId})
}
export const cancelBooking = async (bookingId: string): Promise<void> => {
    await api.post(`/api/bookings/${bookingId}/cancel`)
}
export const getMyBookings = async (page: number): Promise<Page<Booking>> => {
    const response = await api.get<Page<Booking>>('/api/bookings/me', { params: { page, pageSize: 10 } })
    return response.data
}