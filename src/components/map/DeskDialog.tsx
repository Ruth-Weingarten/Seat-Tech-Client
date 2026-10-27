import { bookDesk, cancelBooking, replaceBooking } from "../../api/booking";
import type { DeskWithState, MyBooking } from "../../types/office";
import ErrorMessage from "../ErrorMessage";
import { useMapMutation } from "../../hooks/useMapMutation";
import { deskStateTicket } from "../../utils/deskStateTicket";

interface DeskDialogProps {
    desk: DeskWithState;
    myBooking: MyBooking | null;
    bookingDate: string;
    onClose: () => void;
    hasPermanentDesk: boolean
}

const getDeskTicket = (desk: DeskWithState) => {
    return deskStateTicket[desk.state];
}
type DeskAction = "book" | "switch" | "cancel" | null

const DeskDialog = ({ desk, myBooking, bookingDate, onClose, hasPermanentDesk }: DeskDialogProps) => {
    const book = useMapMutation(bookDesk, onClose)
    const replace = useMapMutation(replaceBooking, onClose)
    const cancel = useMapMutation(cancelBooking, onClose)
    const action: DeskAction = desk.state === "MINE" ? "cancel" : desk.canBook ? myBooking ? "switch" : "book" : null;
    const message =
        desk.state === "BOOKED" ? `Booked by ${desk.bookedByName}` :
            desk.state === "PERMANENT" ? `Permanent desk of ${desk.permanentUser?.fullName}` :
                desk.state === "AVAILABLE" && hasPermanentDesk ? "You have a permanent desk, no need to book" :
                    null
    const handleAction = () => {
        if (action === "book") {
            book.mutate(desk.id)
        }
        else if (action === "cancel" && desk.bookingId) {
            cancel.mutate(desk.bookingId)
        }
        else if (action === "switch" && myBooking) {
            replace.mutate({ bookingId: myBooking.id, deskId: desk.id })
        }
    }

    return (
        <div>
            <span>{getDeskTicket(desk)}</span>
            <div>{desk.label}</div>
            <button type={"button"} onClick={onClose}>Close</button>
            <div>{desk.areaName}</div>
            <div>{bookingDate}</div>
            <div>{desk.os}</div>
            <div>softWare :{desk.software.length === 0 ? <div>none</div> : desk.software.map((s) => (<div key={s}>{s}</div>))}</div>
            <div>accessibility: {desk.accessibility.length === 0 ? <div>none</div> : desk.accessibility.map((s) => <div key={s}>{s}</div>)}</div>
            {action && <button disabled={book.isPending || cancel.isPending || replace.isPending} type="button" onClick={() => { handleAction() }}>{action}</button>}
            {message && <p>{message}</p>}
            <ErrorMessage error={book.error ?? cancel.error ?? replace.error} />
        </div>
    )
}

export default DeskDialog