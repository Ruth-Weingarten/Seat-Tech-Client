import type { Desk, DeskState } from "../types/office";

// Classes for the desk top (the rectangle) by state, on the employee map
export const deskStateClasses: Record<DeskState, string> = {
  AVAILABLE: "bg-white border-[1.5px] border-[#cdbfcf] text-ink",
  BOOKED: "bg-[#ece6ec] border-[1.5px] border-[#d6cbd6] text-[#8a7d8b]",
  MINE: "bg-brand border-[1.5px] border-brand text-white shadow-[0_4px_14px_rgba(224,17,95,0.45)]",
  PERMANENT: "bg-white border-2 border-dashed border-brand text-ink",
  RESTRICTED: "bg-white border-[1.5px] border-[#cdbfcf] text-ink opacity-40",
  MAINTENANCE: "stripes-maint border-[1.5px] border-[#e2b04a] text-[#7a5410]",
  PERMANENT_MINE: "bg-brand border-[1.5px] border-brand text-white shadow-[0_4px_14px_rgba(224,17,95,0.45)]"
}

// On the admin map a desk is colored by its own settings, not by bookings
export const adminDeskClass = (desk: Desk): string => {
  if (desk.status === "MAINTENANCE") return deskStateClasses.MAINTENANCE
  if (desk.permanentUser) return deskStateClasses.PERMANENT
  return deskStateClasses.AVAILABLE
}
