import type { Area, DeskWithState, Floor } from "../../types/office"
import MapArea from "./MapArea"
import MapDesk from "./MapDesk"

interface FloorMapProps {
    floor: Floor
    areas: Area[]
    desks: DeskWithState[]
    onDeskClick: (desk: DeskWithState) => void
    getDeskClassName: (desk: DeskWithState) => string
    getDeskLabel?: (desk: DeskWithState) => string|undefined
    onAddDesk?: (area: Area) => void
    showState?: boolean
}
const CELL_SIZE = 48;
const MapFloor = ({ floor, areas, desks, onDeskClick, getDeskClassName, getDeskLabel,onAddDesk,showState }: FloorMapProps) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${floor.gridWidth}, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(${floor.gridHeight}, ${CELL_SIZE}px)`,
            }}
        >
            {areas.map((area) => (
                <MapArea key={area.id} area={area} onAddDesk={onAddDesk} />
            ))}

            {desks.map((desk) => (
                <MapDesk
                    key={desk.id}
                    desk={desk}
                    className={getDeskClassName(desk)}
                    label={getDeskLabel?.(desk)}
                    onClick={onDeskClick}
                    showState={showState}
                />
            ))}
        </div>
    )
}

export default MapFloor