import type { DeskState } from "../types/office";

 export const deskStateTicket: Record<DeskState, string> = {
    AVAILABLE: "Available",
    BOOKED: "Booked",
    MINE: "Your desk",
    PERMANENT: "Permanent desk",
    RESTRICTED: "Restricted",
    MAINTENANCE: "Maintenance",
    PERMANENT_MINE: "Your permanent desk",
}