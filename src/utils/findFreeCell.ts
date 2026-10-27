import type { Area } from "../types/office";

export type Cell = { x: number; y: number };

const STEP = 2;

export const findFreeCell = (area: Area, desks: Cell[]): Cell | null => {
  const startX = area.x + 1;
  const startY = area.y + 1;
  const endX = area.x + area.width;
  const endY = area.y + area.height;

  const isTaken = (x: number, y: number) =>
    desks.some((d) => d.x === x && d.y === y);

  // ריבוע 3×3 סביב המשבצת ריק
  const isClear = (x: number, y: number) => {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (isTaken(x + dx, y + dy)) return false;
      }
    }
    return true;
  };

  // השורות שכבר יש בהן עמדות, בלי שורת הכותרת
  const rows = [...new Set(
    desks
      .filter((d) => d.x >= startX && d.x < endX && d.y >= startY && d.y < endY)
      .map((d) => d.y)
  )].sort((a, b) => a - b);

  // קודם שורות קיימות, ואחר כך כל שאר השורות
  const otherRows = [];
  for (let y = startY; y < endY; y++) {
    if (!rows.includes(y)) otherRows.push(y);
  }

  for (const y of [...rows, ...otherRows]) {
    for (let x = startX; x < endX; x += STEP) {
      if (isClear(x, y)) return { x, y };
    }
  }

  return null;
};