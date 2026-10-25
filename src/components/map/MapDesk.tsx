import type { Desk } from "../../types/office"

interface MapDeskProps {
    desk: Desk,
    className: string,
    label?: string,
    onClick: (desk: Desk) => void
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
        {label ?? desk.label}
    </button>
    )
}

export default MapDesk