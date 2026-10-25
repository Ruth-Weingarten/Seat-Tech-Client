import type { Area, Desk, Floor } from "../../types/office"
import MapArea from "./MapArea"
import MapDesk from "./MapDesk"

interface FloorMapProps {
  floor: Floor
  areas: Area[]
  desks: Desk[]
  onDeskClick: (desk: Desk) => void
  getDeskClassName: (desk: Desk) => string
  getDeskLabel?: (desk: Desk) => string
}
const CELL_SIZE = 48;
const MapFloor = ({floor,areas,desks,onDeskClick,getDeskClassName,getDeskLabel}:FloorMapProps) => {
  return (
     <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${floor.gridWidth}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${floor.gridHeight}, ${CELL_SIZE}px)`,
      }}
    >
      {areas.map((area) => (
        <MapArea key={area.id} area={area} />
      ))}

      {desks.map((desk) => (
        <MapDesk
          key={desk.id}
          desk={desk}
          className={getDeskClassName(desk)}
          label={getDeskLabel?.(desk)}
          onClick={onDeskClick}
        />
      ))}
    </div>
  )
}

export default MapFloor