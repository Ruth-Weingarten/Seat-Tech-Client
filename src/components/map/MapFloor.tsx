import type { CSSProperties, PointerEvent } from "react"
import type { Area, DeskWithState, Floor } from "../../types/office"
import type { DragItem } from "../../hooks/useLayoutDrag"
import MapArea from "./MapArea"
import MapDesk from "./MapDesk"

interface FloorMapProps {
    floor: Floor
    areas: Area[]
    desks: DeskWithState[]
    cellSize: number
    onDeskClick: (desk: DeskWithState) => void
    getDeskClassName: (desk: DeskWithState) => string
    getDeskLabel?: (desk: DeskWithState) => string|undefined
    onAddDesk?: (area: Area) => void
    showState?: boolean,
    onAreaClick?: (area: Area) => void
    // Dragging (office editor only)
    onItemPointerDown?: (item: DragItem, e: PointerEvent<HTMLElement>) => void
    onPointerMove?: (e: PointerEvent<HTMLElement>) => void
    onPointerUp?: () => void
    dragStyle?: (item: DragItem, areaId?: string) => CSSProperties | undefined
}
const MapFloor = ({ floor, areas, desks, cellSize, onDeskClick, getDeskClassName, getDeskLabel,onAddDesk,showState,onAreaClick, onItemPointerDown, onPointerMove, onPointerUp, dragStyle }: FloorMapProps) => {
    return (
        <div
            className={`floor-paper rounded-lg ${onItemPointerDown ? "select-none" : ""}`}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${floor.gridWidth}, ${cellSize}px)`,
                gridTemplateRows: `repeat(${floor.gridHeight}, ${cellSize}px)`,
                // desks and the paper lines are sized from this
                "--cell": `${cellSize}px`,
            } as CSSProperties}
        >
            {areas.map((area) => (
                <MapArea key={area.id} area={area} cellSize={cellSize} onAddDesk={onAddDesk} onClick={onAreaClick}
                    onPointerDown={onItemPointerDown ? (e) => onItemPointerDown({ kind: "area", id: area.id }, e) : undefined}
                    dragStyle={dragStyle?.({ kind: "area", id: area.id })} />
            ))}

            {desks.map((desk) => (
                <MapDesk
                    key={desk.id}
                    desk={desk}
                    className={getDeskClassName(desk)}
                    label={getDeskLabel?.(desk)}
                    onClick={onDeskClick}
                    showState={showState}
                    onPointerDown={onItemPointerDown ? (e) => onItemPointerDown({ kind: "desk", id: desk.id }, e) : undefined}
                    dragStyle={dragStyle?.({ kind: "desk", id: desk.id }, desk.areaId)}
                />
            ))}
        </div>
    )
}

export default MapFloor
