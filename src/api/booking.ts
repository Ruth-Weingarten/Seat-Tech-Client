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