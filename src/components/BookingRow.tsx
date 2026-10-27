import type { Booking } from "../types/bookings";
import { formatDate } from "../utils/employeeFormat";


interface BookingRowProps {
    booking: Booking;
}

const cancelledByText = (booking: Booking): string => {
    if (booking.status === "ACTIVE") return "—"
    if (booking.cancelledByAdmin) return "Admin"
    return "Me"
}
const tdClass = "py-4 pr-4 border-b border-[#f1ecf1] whitespace-nowrap"

const BookingRow = ({ booking }: BookingRowProps) => {
    const active = booking.status === "ACTIVE"
    return (
        <tr className={active ? "" : "text-[#8a7e8b]"}>
            <td className={tdClass}>{formatDate(booking.date)}</td>
            <td className={tdClass}><span className={`font-mono text-sm px-2 py-1 ${active ? "bg-brand-soft text-[#a30d48]" : "bg-[#f1edf1] text-[#776b78]"}`}>{booking.desk.label}</span></td>
            <td className={tdClass}>{booking.desk.floorName} · {booking.desk.areaName}</td>
            <td className={tdClass}><span className="inline-flex items-center gap-2"><span className={`size-2 rounded-full ${active ? "bg-[#1f9d5c]" : "bg-[#a99ea9]"}`}></span>{active ? "Active" : "Cancelled"}</span></td>
            <td className={tdClass}>{cancelledByText(booking)}</td>
        </tr>
    )
}

export default BookingRow
