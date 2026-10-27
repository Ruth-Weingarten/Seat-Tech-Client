import type { CSSProperties, PointerEvent } from "react"
import type { DeskWithState } from "../../types/office"
import { deskStateTicket } from "../../utils/deskStateTicket"
import { initials } from "../../utils/employeeFormat"

interface MapDeskProps {
    desk: DeskWithState,
    className: string,
    label?: string,
    showState:boolean|undefined,
    onClick: (desk: DeskWithState) => void
    onPointerDown?: (e: PointerEvent<HTMLButtonElement>) => void
    dragStyle?: CSSProperties
}

// Who sits here, for the initials badge and the tooltip
const deskPerson = (desk: DeskWithState): string | null => {
    if (desk.state === "BOOKED") return desk.bookedByName
    if (desk.state === "PERMANENT") return desk.permanentUser?.fullName ?? null
    return null
}

// A desk seen from above: the desk top (with the screen) and a chair.
// Sizes follow --cell (the grid cell size set by MapFloor), so desks grow with the map.
// The whole desk turns with its rotation; the texts turn back so they stay readable.
const MapDesk = ({ desk, className, label, onClick ,showState, onPointerDown, dragStyle}: MapDeskProps) => {
    const person = deskPerson(desk)
    const upright = { transform: `rotate(${-desk.rotation}deg)` }
    return (<button
        type="button"
        data-state={desk.state}
        className={`group relative z-10 hover:z-30 focus-visible:z-30 flex flex-col items-center justify-center gap-[calc(var(--cell)*0.04)] cursor-pointer select-none outline-none ${onPointerDown ? "touch-none cursor-grab active:cursor-grabbing" : ""}`}
        aria-label={`Desk ${desk.label}${label ? `, ${label}` : ""}`}
        onClick={() => onClick(desk)}
        onPointerDown={onPointerDown}
        style={{
            gridColumn: desk.x + 1,
            gridRow: desk.y + 1,
            ...dragStyle,
            transform: `${dragStyle?.transform ?? ""} rotate(${desk.rotation}deg)`,
        }}
    >
        {showState&&<span className="sr-only">{deskStateTicket[desk.state]}</span>}
        <span className={`relative w-[calc(var(--cell)*0.94)] h-[calc(var(--cell)*0.58)] rounded-[7px] flex items-center justify-center font-mono text-[calc(var(--cell)*0.24)] font-bold transition-shadow group-hover:shadow-[0_4px_10px_rgba(35,26,36,0.18)] group-focus-visible:ring-2 group-focus-visible:ring-brand ${className}`}>
            <span className="absolute top-[calc(var(--cell)*0.06)] left-1/2 -translate-x-1/2 w-[calc(var(--cell)*0.36)] h-[calc(var(--cell)*0.06)] rounded-sm bg-[#9a8c9b] group-data-[state=MINE]:bg-white group-data-[state=PERMANENT_MINE]:bg-white" aria-hidden="true"></span>
            <span className="mt-[calc(var(--cell)*0.08)]" style={upright}>{desk.label}</span>
            {person && <span style={upright} className={`absolute -right-[calc(var(--cell)*0.16)] -top-[calc(var(--cell)*0.16)] size-[calc(var(--cell)*0.4)] rounded-full border-2 border-white text-white font-sans text-[calc(var(--cell)*0.17)] font-bold flex items-center justify-center ${desk.state === "BOOKED" ? "bg-plum" : "bg-brand"}`} aria-hidden="true">{initials(person)}</span>}
        </span>
        <span className="w-[calc(var(--cell)*0.46)] h-[calc(var(--cell)*0.24)] rounded-full bg-[#e5dce6] group-data-[state=MINE]:bg-[#f6a3c2] group-data-[state=PERMANENT_MINE]:bg-[#f6a3c2]" aria-hidden="true"></span>

        <span role="tooltip" style={{ transform: `translateX(-50%) rotate(${-desk.rotation}deg)` }}
            className="pointer-events-none absolute left-1/2 bottom-full mb-1 hidden group-hover:block group-focus-visible:block group-active:hidden whitespace-nowrap rounded-md bg-ink px-3 py-2 text-left font-sans text-sm leading-tight text-white shadow-[0_6px_18px_rgba(35,26,36,0.25)]">
            <strong className="font-bold">{person ?? deskStateTicket[desk.state]}</strong>
            {person && <span className="block text-[#d9c9d8]">{deskStateTicket[desk.state]}</span>}
        </span>
    </button>
    )
}

export default MapDesk
