import type { Area } from "../../types/office"

interface MapAreaProps {
    area: Area,
    onClick?: (area: Area) => void
    onAddDesk?: (area: Area) => void
}

const MapArea = ({ area, onClick,onAddDesk}: MapAreaProps) => {
    return (
        <div
       
            onClick={() => onClick?.(area)}
            style={{
                gridColumn: `${area.x + 1} / span ${area.width}`,
                gridRow: `${area.y + 1} / span ${area.height}`,
            }}
        > 
        {onAddDesk &&area.isWorkspace &&<button type="button" onClick={()=>onAddDesk(area)}>+</button>}
            {area.name}
        </div>
    )
}

export default MapArea