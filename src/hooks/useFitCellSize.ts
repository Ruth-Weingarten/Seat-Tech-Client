import { useEffect, useState } from "react";

const MIN_CELL = 40
const MAX_CELL = 84

// Picks the grid cell size so the whole floor fits the width of its box (no side scroll).
// Usage: const { ref, cellSize } = useFitCellSize(floor.gridWidth); <div ref={ref}>…</div>
// `ref` is a callback ref, so it also works when the box appears only after loading.
export const useFitCellSize = (gridWidth: number) => {
    const [box, setBox] = useState<HTMLDivElement | null>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (!box) return
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
        observer.observe(box)
        return () => observer.disconnect()
    }, [box])

    const cellSize = width === 0
        ? 48
        : Math.min(MAX_CELL, Math.max(MIN_CELL, Math.floor(width / gridWidth)))
    return { ref: setBox, cellSize }
}
