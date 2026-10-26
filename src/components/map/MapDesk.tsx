import type { DeskWithState } from "../../types/office"
import { deskStateTicket } from "../../utils/deskState"

interface MapDeskProps {
    desk: DeskWithState,
    className: string,
    label?: string,
    onClick: (desk: DeskWithState) => void
}

const MapDesk = ({ desk, className, label, onClick }: MapDeskProps) => {
    return (<button
        type="button"
        className={className}
        title={label ?? desk.label}
        onClick={() => onClick(desk)}
        style={{
            gridColumn: desk.x + 1,
            gridRow: desk.y + 1,
            transform: `rotate(${desk.rotation}deg)`,
        }}
    >
    <span>{deskStateTicket[desk.state]}</span>
    <span> {desk.label}</span>
    {label && <span>{label}</span>}
    </button>
    )
}

export default MapDesk