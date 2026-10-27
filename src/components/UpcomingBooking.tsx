import { Link } from "react-router"
import type { Booking } from "../types/bookings"
import { formatDate } from "../utils/employeeFormat"

interface UpcomingBookingProps {
    booking: Booking | undefined;
    onCancel: (booking: Booking) => void;
    isPending: boolean;
}

const UpcomingBooking = ({ booking, onCancel, isPending }: UpcomingBookingProps) => {
    if (!booking) {
        return (
            <section>
                <h2>No booking for the next working day</h2>
                <Link to="/map">Book a desk →</Link>
            </section>
        )
    }
    return (
        <section>
            <h2>Upcoming booking</h2>
            <span>Active</span>
            <dl>
                <dt>Date</dt><dd>{formatDate(booking.date)}</dd>
                <dt>Desk</dt><dd>{booking.desk.label}</dd>
                <dt>Location</dt><dd>{booking.desk.floorName} · {booking.desk.areaName}</dd>
            </dl>
            {booking.canReplace && <Link to="/map">Change desk →</Link>}
            {booking.canCancel && (
                <button type="button" disabled={isPending} onClick={() => onCancel(booking)}>Cancel booking</button>
            )}
        </section>
    )
}

export default UpcomingBooking