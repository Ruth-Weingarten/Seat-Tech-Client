import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { Area, DeskWithState, Floor, LayoutChange } from "../types/office";

export type DragItem = { kind: "desk"; id: string } | { kind: "area"; id: string }

interface DragState {
    item: DragItem;
    startX: number;
    startY: number;
    dx: number;       // how far the pointer moved, in px
    dy: number;
    moved: boolean;   // moved more than a few px = a drag, not a click
    saving: boolean;  // dropped, waiting for the server
}

const inside = (a: Area, x: number, y: number) =>
    x >= a.x && x < a.x + a.width && y >= a.y && y < a.y + a.height

const overlaps = (a: { x: number, y: number, width: number, height: number }, b: typeof a) =>
    a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height

// Drag desks and areas on the office map.
// - A desk moves inside its own area. Dropping it on another desk of the same area swaps the two.
// - An area moves with all its desks, and must stay inside the floor without overlapping another area.
// On drop the new positions are snapped to the grid and sent with `save` (PUT /floors/{id}/layout).
export const useLayoutDrag = (
    floor: Floor | undefined,
    areas: Area[],
    desks: DeskWithState[],
    cellSize: number,
    save: (layout: LayoutChange) => Promise<unknown>,
) => {
    const [drag, setDrag] = useState<DragState | null>(null)
    const [rejected, setRejected] = useState(false)
    const blockClick = useRef(false)

    const buildLayout = (item: DragItem, cx: number, cy: number): LayoutChange | null => {
        if (!floor || (cx === 0 && cy === 0)) return null
        if (item.kind === "desk") {
            const desk = desks.find((d) => d.id === item.id)
            const area = desk && areas.find((a) => a.id === desk.areaId)
            if (!desk || !area) return null
            const x = desk.x + cx, y = desk.y + cy
            if (!inside(area, x, y)) return null
            const other = desks.find((d) => d.id !== desk.id && d.x === x && d.y === y)
            if (other && other.areaId !== desk.areaId) return null
            return {
                areas: [],
                desks: other
                    ? [{ id: desk.id, x, y }, { id: other.id, x: desk.x, y: desk.y }]
                    : [{ id: desk.id, x, y }],
            }
        }
        const area = areas.find((a) => a.id === item.id)
        if (!area) return null
        const moved = { x: area.x + cx, y: area.y + cy, width: area.width, height: area.height }
        if (moved.x < 0 || moved.y < 0 || moved.x + moved.width > floor.gridWidth || moved.y + moved.height > floor.gridHeight) return null
        if (areas.some((a) => a.id !== area.id && overlaps(a, moved))) return null
        return {
            areas: [{ id: area.id, ...moved }],
            desks: desks.filter((d) => d.areaId === area.id).map((d) => ({ id: d.id, x: d.x + cx, y: d.y + cy })),
        }
    }

    const onItemPointerDown = (item: DragItem, e: PointerEvent<HTMLElement>) => {
        if (e.button !== 0 || drag?.saving) return
        e.stopPropagation()
        setDrag({ item, startX: e.clientX, startY: e.clientY, dx: 0, dy: 0, moved: false, saving: false })
    }

    const onPointerMove = (e: PointerEvent<HTMLElement>) => {
        if (!drag || drag.saving) return
        const dx = e.clientX - drag.startX
        const dy = e.clientY - drag.startY
        setDrag({ ...drag, dx, dy, moved: drag.moved || Math.abs(dx) > 4 || Math.abs(dy) > 4 })
    }

    const onPointerUp = async () => {
        if (!drag || drag.saving) return
        if (!drag.moved) {
            setDrag(null)
            return
        }
        // The click that follows a drag must not open the edit form.
        blockClick.current = true
        setTimeout(() => { blockClick.current = false }, 0)

        const cx = Math.round(drag.dx / cellSize)
        const cy = Math.round(drag.dy / cellSize)
        const layout = buildLayout(drag.item, cx, cy)
        if (!layout) {
            setDrag(null)
            if (cx !== 0 || cy !== 0) {
                setRejected(true)
                setTimeout(() => setRejected(false), 2500)
            }
            return
        }
        setDrag({ ...drag, dx: cx * cellSize, dy: cy * cellSize, saving: true })
        try {
            await save(layout)
        } catch {
            // the error is shown from the mutation
        } finally {
            setDrag(null)
        }
    }

    // Use in onClick handlers: false right after a drag.
    const allowClick = () => !blockClick.current

    const dragStyle = (item: DragItem, areaId?: string): CSSProperties | undefined => {
        if (!drag || !drag.moved) return undefined
        const isItem = drag.item.kind === item.kind && drag.item.id === item.id
        const followsArea = drag.item.kind === "area" && item.kind === "desk" && areaId === drag.item.id
        if (!isItem && !followsArea) return undefined
        return {
            transform: `translate(${drag.dx}px, ${drag.dy}px)`,
            zIndex: 30,
            transition: drag.saving ? "transform 150ms ease-out" : "none",
            filter: drag.saving ? undefined : "drop-shadow(0 10px 14px rgba(35,26,36,0.28))",
        }
    }

    return { isDragging: !!drag?.moved, isSaving: !!drag?.saving, rejected, onItemPointerDown, onPointerMove, onPointerUp, dragStyle, allowClick }
}
