import type { CSSProperties, PointerEvent } from "react"
import type { Area } from "../../types/office"
import { AREA_STYLES } from "../../utils/areaStyles"
import AreaDecor from "./AreaDecor"

interface MapAreaProps {
    area: Area,
    cellSize: number,
    onClick?: (area: Area) => void
    onAddDesk?: (area: Area) => void
    onPointerDown?: (e: PointerEvent<HTMLDivElement>) => void
    dragStyle?: CSSProperties
}

const MapArea = ({ area, cellSize, onClick, onAddDesk, onPointerDown, dragStyle }: MapAreaProps) => {
    const s = AREA_STYLES[area.type]
    const Icon = s.icon
    const chipClass = `absolute left-2 ${s.chipBottom ? "bottom-2" : "top-2"} z-[1] flex items-center gap-1.5 bg-white rounded-full pl-1 pr-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[1px] shadow-[0_1px_2px_rgba(60,40,90,0.12)] max-w-[calc(100%-16px)] ${s.chipText}`
    const chipContent = <>
        <span className={`flex-none size-5 rounded-full flex items-center justify-center ${s.iconBg}`}><Icon className={`size-[13px] ${s.iconColor}`} strokeWidth={2.2} aria-hidden="true" /></span>
        <span className="truncate">{area.name}</span>
    </>
    return (
        <div
            onPointerDown={onPointerDown}
            style={{
                gridColumn: `${area.x + 1} / span ${area.width}`,
                gridRow: `${area.y + 1} / span ${area.height}`,
                ...dragStyle,
            }}
            className={`relative m-[3px] rounded-xl border-[1.5px] overflow-hidden ${s.box} ${onPointerDown ? "cursor-grab active:cursor-grabbing touch-none" : ""}`}
        >
            <AreaDecor area={area} cellSize={cellSize} />
            {onClick
                ? <button type="button" title="Edit area" onClick={() => onClick(area)} className={`${chipClass} cursor-pointer hover:ring-2 hover:ring-brand/40`}>{chipContent}</button>
                : <span className={chipClass}>{chipContent}</span>}

            {onAddDesk && area.isWorkspace &&
                <button type="button" title="Add desk" aria-label={`Add desk to ${area.name}`} onClick={() => onAddDesk(area)} className={`absolute right-2 top-2 z-[1] size-[26px] rounded-full bg-white border-[1.5px] border-dashed text-[17px] font-bold leading-none cursor-pointer hover:bg-brand hover:text-white hover:border-brand transition-colors ${s.plus}`}>+</button>}
        </div>
    )
}

export default MapArea
