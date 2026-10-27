import type { Area } from "../types/office";

export type Rect = { x: number; y: number; width: number; height: number };

export const AREA_SIZES: Record<string, { width: number; height: number }> = {
    OPEN_SPACE: { width: 9, height: 5 },
    DEV_ROOM: { width: 7, height: 4 },
    QUIET_ROOM: { width: 5, height: 4 },
    MEETING_ROOM: { width: 5, height: 4 },
    KITCHEN: { width: 4, height: 3 },
    RESTROOM: { width: 4, height: 3 },
    ENTRANCE: { width: 3, height: 2 },
    BALCONY: { width: 3, height: 6 },
};

// שני מלבנים חופפים, כולל משבצת רווח מסביב
const overlaps = (a: Rect, b: Rect) =>
    a.x < b.x + b.width + 1 && b.x < a.x + a.width + 1 &&
    a.y < b.y + b.height + 1 && b.y < a.y + a.height + 1;

export const findFreeRect = (
    gridWidth: number, gridHeight: number, areas: Area[], size: { width: number; height: number }
): Rect | null => {
    for (let y = 0; y + size.height <= gridHeight; y++) {
        for (let x = 0; x + size.width <= gridWidth; x++) {
            const rect = { x, y, ...size };
            if (!areas.some((a) => overlaps(rect, a))) return rect;
        }
    }
    return null;
};