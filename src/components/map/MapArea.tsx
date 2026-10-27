import type { Area } from "../../types/office"

interface MapAreaProps {
    area: Area,
    onClick?: (area: Area) => void
    onAddDesk?: (area: Area) => void
}

const MapArea = ({ area, onClick, onAddDesk }: MapAreaProps) => {
    return (
        <div
            style={{
                gridColumn: `${area.x + 1} / span ${area.width}`,
                gridRow: `${area.y + 1} / span ${area.height}`,
            }}
        >
            {onClick
                ? <button type="button" title="Edit area" onClick={() => onClick(area)}>{area.name}</button>
                : <span>{area.name}</span>}

            {onAddDesk && area.isWorkspace &&
                <button type="button" title="Add desk" onClick={() => onAddDesk(area)}>+</button>}
        </div>
    )
}

export default MapArea