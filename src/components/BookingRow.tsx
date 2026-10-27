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

const BookingRow = ({ booking }: BookingRowProps) => {
    return (
        <tr>
            <td>{formatDate(booking.date)}</td>
            <td>{booking.desk.label}</td>
            <td>{booking.desk.floorName} · {booking.desk.areaName}</td>
            <td>● {booking.status === "ACTIVE" ? "Active" : "Cancelled"}</td>
            <td>{cancelledByText(booking)}</td>
        </tr>
    )
}

export default BookingRow