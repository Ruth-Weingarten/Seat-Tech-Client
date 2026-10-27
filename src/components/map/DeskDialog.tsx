import { Accessibility, CalendarDays, CodeXml, Monitor, X } from "lucide-react";
import { bookDesk, cancelBooking, replaceBooking } from "../../api/booking";
import type { DeskState, DeskWithState, MyBooking } from "../../types/office";
import ErrorMessage from "../ErrorMessage";
import { useMapMutation } from "../../hooks/useMapMutation";
import { deskStateTicket } from "../../utils/deskStateTicket";
import { AREA_STYLES } from "../../utils/areaStyles";
import { formatDate } from "../../utils/employeeFormat";

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

// Color of the state chip
const stateChip: Record<DeskState, string> = {
    AVAILABLE: "bg-[#e6f5ec] text-[#1f7a4d]",
    BOOKED: "bg-[#f1edf1] text-[#5d525e]",
    MINE: "bg-brand-soft text-brand-dark",
    PERMANENT: "bg-brand-soft text-brand-dark",
    PERMANENT_MINE: "bg-brand-soft text-brand-dark",
    MAINTENANCE: "bg-[#fdf1d4] text-[#7a5410]",
    RESTRICTED: "bg-[#f1edf1] text-[#5d525e]",
}
const rowClass = "flex items-start gap-2.5 text-[15px]"
const rowIcon = "size-[18px] mt-0.5 flex-none text-[#8a7d8b]"
const tagClass = "font-mono text-xs bg-[#f1edf1] text-[#3d323e] px-2 py-0.5 rounded"

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
    const actionLabels: Record<"book" | "switch" | "cancel", string> = {
    book: "Book this desk",
    switch: "Switch to this desk",
    cancel: "Cancel booking",
}
    const area = AREA_STYLES[desk.areaType]
    const AreaIcon = area.icon

    return (
        <div className="flex flex-col">
            <div className="flex items-start gap-3.5 px-[22px] pt-[22px] pb-[18px] border-b border-[#eee8ee]">
            <span className={`flex-[0_0_56px] h-14 rounded-xl border-[1.5px] flex items-center justify-center ${area.box}`}><AreaIcon className={`size-7 ${area.iconColor}`} strokeWidth={1.7} aria-hidden="true" /></span>
            <div className="flex-1 min-w-0">
            <h2 className="font-mono text-[26px] font-bold leading-tight">{desk.label}</h2>
            <p className="text-[15px] text-muted">{desk.areaName} · {desk.floorName}</p>
            </div>
            <button type={"button"} onClick={onClose} aria-label="Close" className="flex-none size-11 rounded-[10px] border border-line flex items-center justify-center cursor-pointer hover:bg-[#f7f4f7]"><X className="size-4" aria-hidden="true" /></button>
            </div>
            <div className="flex flex-col gap-4 px-[22px] pt-[18px] pb-[22px]">
            <span className={`self-start inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${stateChip[desk.state]}`}><span className="size-2 rounded-full bg-current"></span>{getDeskTicket(desk)}</span>
            <ul className="flex flex-col gap-2.5">
            <li className={rowClass}><CalendarDays className={rowIcon} aria-hidden="true" />{formatDate(bookingDate)}</li>
            <li className={rowClass}><Monitor className={rowIcon} aria-hidden="true" />{desk.os}</li>
            <li className={rowClass}><CodeXml className={rowIcon} aria-hidden="true" /><span className="flex flex-wrap gap-1.5">{desk.software.length === 0 ? <span className="text-muted">No software listed</span> : desk.software.map((s) => (<span key={s} className={tagClass}>{s}</span>))}</span></li>
            <li className={rowClass}><Accessibility className={rowIcon} aria-hidden="true" /><span className="flex flex-wrap gap-1.5">{desk.accessibility.length === 0 ? <span className="text-muted">No accessibility features</span> : desk.accessibility.map((s) => <span key={s} className={tagClass}>{s}</span>)}</span></li>
            </ul>
            {message && <p className="text-sm leading-relaxed text-muted bg-[#f7f4f7] px-3.5 py-3 rounded-[10px]">{message}</p>}
            {action && <button disabled={book.isPending || cancel.isPending || replace.isPending} type="button" onClick={() => { handleAction() }}
              className={`font-bold text-[17px] py-[15px] rounded-[10px] cursor-pointer disabled:opacity-60 transition-colors ${action === "cancel" ? "bg-white text-brand-dark border border-[#e7b3c7] hover:bg-brand-soft" : "bg-brand text-white hover:bg-brand-dark shadow-[0_6px_16px_rgba(224,17,95,0.25)]"}`}>{actionLabels[action]}</button>}
            <ErrorMessage error={book.error ?? cancel.error ?? replace.error} />
            </div>
        </div>
    )
}

export default DeskDialog
