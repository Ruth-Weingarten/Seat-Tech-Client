import type { DeskWithState } from "../../types/office"
import { deskStateTicket } from "../../utils/deskStateTicket"

interface MapDeskProps {
    desk: DeskWithState,
    className: string,
    label?: string,
    showState:boolean|undefined,
    onClick: (desk: DeskWithState) => void
}

const MapDesk = ({ desk, className, label, onClick ,showState}: MapDeskProps) => {
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
        {showState&&<span>{deskStateTicket[desk.state]}</span>}
        <span> {desk.label}</span>
        {label && <span>{label}</span>}
    </button>
    )
}

export default MapDesk