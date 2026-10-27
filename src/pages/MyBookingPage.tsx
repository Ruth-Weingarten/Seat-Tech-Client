
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
import PageHero from "../components/PageHero"
import { useConfirm } from "../hooks/useConfirm"

const thClass = "pt-[18px] pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-[2px] text-label border-b border-[#eee8ee] whitespace-nowrap"

const MyBookingPage = () => {
    const [page, setPage] = useState(1)
    const { data, isLoading, error } = useMyBookings(page)
    const { data: firstPage } = useMyBookings(1)
    const upcoming = firstPage?.items.find((b) => b.canCancel || b.canReplace)
    const cancel = useMapMutation(cancelBooking, () => { })

    const { confirm, dialog } = useConfirm()

    async function handleCancel(booking: Booking) {
        if (await confirm({ title: "Cancel this booking?", message: `${formatDate(booking.date)} · desk ${booking.desk.label}`, confirmText: "Cancel booking", cancelText: "Keep it", danger: true })) {
            cancel.mutate(booking.id)
        }
    }

    return (
        <>
            {dialog}
            <PageHero headline="Your desk." tagline="Next and past.">Your upcoming booking and everything you booked before.</PageHero>
            <main className="relative mx-auto max-w-[1200px] -mt-[84px] px-4 sm:px-10 pb-14 flex flex-col gap-8">
            {isLoading && <Loading text="Loading bookings..." />}
            <ErrorMessage error={error ?? cancel.error} />

            {firstPage && <UpcomingBooking booking={upcoming} onCancel={handleCancel} isPending={cancel.isPending} />}

            <section className="bg-white border border-line">
            <h2 className="px-7 pt-6 pb-2 text-[22px] font-bold">Booking history</h2>
            {data && data.items.length === 0 && <p className="px-7 pb-8 pt-2 text-muted">No bookings yet.</p>}
            {data && data.items.length > 0 && (
                <>
                    <div className="overflow-x-auto px-7">
                    <table className="w-full border-collapse text-base">
                        <thead>
                            <tr>
                                <th className={thClass}>Date</th>
                                <th className={thClass}>Desk</th>
                                <th className={thClass}>Location</th>
                                <th className={thClass}>Status</th>
                                <th className={thClass}>Cancelled by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((b) => <BookingRow key={b.id} booking={b} />)}
                        </tbody>
                    </table>
                    </div>
                    <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPage={setPage} />
                </>
            )}
            </section>
            </main>
        </>
    )
}

export default MyBookingPage
