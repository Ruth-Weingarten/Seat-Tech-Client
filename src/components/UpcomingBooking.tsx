import { Link } from "react-router"
import { Armchair } from "lucide-react"
import type { Booking } from "../types/bookings"
import { formatDate } from "../utils/employeeFormat"

interface UpcomingBookingProps {
    booking: Booking | undefined;
    onCancel: (booking: Booking) => void;
    isPending: boolean;
}

const cardClass = "bg-white border border-line p-6 flex flex-wrap items-center gap-7 shadow-[0_8px_24px_rgba(35,26,36,0.06)]"
const iconTile = <span className="flex-[0_0_96px] h-24 bg-tile flex items-center justify-center"><Armchair className="size-10 text-[#ffd6e6]" strokeWidth={1.5} aria-hidden="true" /></span>
const dtClass = "text-xs uppercase tracking-[2px] text-label"
const ddClass = "mt-0.5 text-2xl font-bold"

const UpcomingBooking = ({ booking, onCancel, isPending }: UpcomingBookingProps) => {
    if (!booking) {
        return (
            <section className={cardClass}>
                {iconTile}
                <div className="flex-[1_1_320px] min-w-0">
                <h2 className="text-2xl font-bold">No booking for the next working day</h2>
                <p className="text-muted">Pick a free desk on the map.</p>
                </div>
                <Link to="/map" className="bg-brand hover:bg-brand-dark text-white font-bold px-5 py-[13px] no-underline transition-colors">Book a desk →</Link>
            </section>
        )
    }
    return (
        <section className={cardClass}>
            {iconTile}
            <div className="flex-[1_1_320px] min-w-0 flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-[3px] text-label">Upcoming booking</h2>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f7a4d]"><span className="size-2 rounded-full bg-[#1f9d5c]"></span>Active</span>
            </div>
            <dl className="flex flex-wrap gap-x-11 gap-y-3">
                <div><dt className={dtClass}>Date</dt><dd className={ddClass}>{formatDate(booking.date)}</dd></div>
                <div><dt className={dtClass}>Desk</dt><dd className={`${ddClass} font-mono`}>{booking.desk.label}</dd></div>
                <div><dt className={dtClass}>Location</dt><dd className={ddClass}>{booking.desk.floorName} · {booking.desk.areaName}</dd></div>
            </dl>
            </div>
            <div className="flex flex-wrap gap-3">
            {booking.canReplace && <Link to="/map" className="bg-brand hover:bg-brand-dark text-white font-bold px-5 py-[13px] no-underline transition-colors">Change desk →</Link>}
            {booking.canCancel && (
                <button type="button" disabled={isPending} onClick={() => onCancel(booking)} className="bg-white text-brand-dark border border-[#e7b3c7] hover:bg-brand-soft font-bold px-[18px] py-3 cursor-pointer disabled:opacity-50 transition-colors">Cancel booking</button>
            )}
            </div>
        </section>
    )
}

export default UpcomingBooking
