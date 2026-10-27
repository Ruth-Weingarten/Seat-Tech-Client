import type { DeskState } from "../types/office";

export const deskStateClasses: Record<DeskState, string> = {
  AVAILABLE: "free",
  BOOKED: "taken",
  MINE: "mine",
  PERMANENT: "taken",
  RESTRICTED: "restricted",
  MAINTENANCE: "maintenance",
  PERMANENT_MINE: "mine"
}