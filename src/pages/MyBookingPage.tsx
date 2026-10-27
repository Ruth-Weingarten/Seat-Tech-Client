
import { useState } from "react"
import { useMyBookings } from "../hooks/useMyBookings"
import { useMapMutation } from "../hooks/useMapMutation"
import { cancelBooking } from "../api/booking"
import { formatDate } from "../utils/employeeFormat"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import Pagination from "../components/Pagination"
import type { Booking } from "../types/bookings"
import UpcomingBooking from "../components/UpcomingBooking"
import BookingRow from "../components/BookingRow"


const MyBookingPage = () => {
    const [page, setPage] = useState(1)
    const { data, isLoading, error } = useMyBookings(page)
    const { data: firstPage } = useMyBookings(1)
    const upcoming = firstPage?.items.find((b) => b.canCancel || b.canReplace)
    const cancel = useMapMutation(cancelBooking, () => { })

    function handleCancel(booking: Booking) {
        if (window.confirm(`Cancel your booking for ${formatDate(booking.date)} (desk ${booking.desk.label})?`)) {
            cancel.mutate(booking.id)
        }
    }

    return (
        <>
            <h1>My bookings</h1>
            {isLoading && <Loading text="Loading bookings..." />}
            <ErrorMessage error={error ?? cancel.error} />

            {firstPage && <UpcomingBooking booking={upcoming} onCancel={handleCancel} isPending={cancel.isPending} />}

            <h2>Booking history</h2>
            {data && data.items.length === 0 && <p>No bookings yet.</p>}
            {data && data.items.length > 0 && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Desk</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Cancelled by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((b) => <BookingRow key={b.id} booking={b} />)}
                        </tbody>
                    </table>
                    <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPage={setPage} />
                </>
            )}
        </>
    )
}

export default MyBookingPage