import type { DeskState } from "../../types/office"
import { deskStateClasses } from "../../utils/deskState"
import { deskStateTicket } from "../../utils/deskStateTicket"

const LEGEND_STATES: DeskState[] = ["AVAILABLE", "BOOKED", "MINE", "PERMANENT", "MAINTENANCE", "RESTRICTED"]

// What each desk color means. Uses the same classes as the desks themselves.
const MapLegend = () => {
    return (
        <ul className="flex flex-wrap items-center gap-x-[22px] gap-y-2 px-[18px] py-3.5 text-[13px] text-[#4a3d4b]">
            {LEGEND_STATES.map((state) => (
                <li key={state} className="flex items-center gap-2">
                    <span className={`w-[26px] h-3.5 rounded-[3px] shadow-none ${deskStateClasses[state]}`} aria-hidden="true"></span>
                    {deskStateTicket[state]}
                </li>
            ))}
        </ul>
    )
}

export default MapLegend
