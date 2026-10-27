import { Coffee, CodeXml, DoorOpen, Headphones, LayoutGrid, Leaf, Toilet, Users, type LucideIcon } from "lucide-react";
import type { AreaType } from "../types/office";

export interface AreaStyle {
  label: string;      // English name for the type
  box: string;        // border + floor of the area
  chipText: string;   // color of the name chip
  iconBg: string;     // circle behind the icon
  iconColor: string;
  icon: LucideIcon;
  plus: string;       // the "+ desk" button
  chipBottom?: boolean; // name chip at the bottom (the top has furniture)
}

// One look per area type. Changing a line here changes every area of that type on every map.
export const AREA_STYLES: Record<AreaType, AreaStyle> = {
  DEV_ROOM: {
    label: "Dev room", box: "border-[#c9b8e6] bg-[#f4f0fc]", chipText: "text-[#4b3a6b]",
    iconBg: "bg-[#e6dcf7]", iconColor: "text-[#6b4fae]", icon: CodeXml, plus: "text-[#6b4fae] border-[#b39ddd]",
  },
  OPEN_SPACE: {
    label: "Open space", box: "border-[#f3b5cb] bg-[#fff3f7]", chipText: "text-[#8a1d48]",
    iconBg: "bg-[#fbdbe7]", iconColor: "text-[#c42a65]", icon: LayoutGrid, plus: "text-[#c42a65] border-[#f3b5cb]",
  },
  QUIET_ROOM: {
    label: "Quiet room", box: "border-[#a9d5c2] bg-[#eef8f3]", chipText: "text-[#22584a]",
    iconBg: "bg-[#d3ede2]", iconColor: "text-[#2f8467]", icon: Headphones, plus: "text-[#2f8467] border-[#8cc7ae]",
  },
  MEETING_ROOM: {
    label: "Meeting room", box: "border-[#b7cbe8] bg-[#eef4fc]", chipText: "text-[#2f4a75]",
    iconBg: "bg-[#d8e5f7]", iconColor: "text-[#3d64a8]", icon: Users, plus: "text-[#3d64a8] border-[#9fb6da]",
  },
  KITCHEN: {
    label: "Kitchen", box: "border-[#e9cf9c] floor-kitchen", chipText: "text-[#6e4d16]",
    iconBg: "bg-[#f8e6c2]", iconColor: "text-[#a8721c]", icon: Coffee, plus: "text-[#a8721c] border-[#e9cf9c]", chipBottom: true,
  },
  RESTROOM: {
    label: "Restrooms", box: "border-[#b9d6e6] floor-restroom", chipText: "text-[#2d5872]",
    iconBg: "bg-[#dcecf5]", iconColor: "text-[#3a7aa0]", icon: Toilet, plus: "text-[#3a7aa0] border-[#b9d6e6]",
  },
  BALCONY: {
    label: "Balcony", box: "border-[#d8b98c] border-b-4 border-b-[#b08b5c] floor-balcony", chipText: "text-[#6b4a22]",
    iconBg: "bg-[#dff0d9]", iconColor: "text-[#4f8f3f]", icon: Leaf, plus: "text-[#4f8f3f] border-[#d8b98c]", chipBottom: true,
  },
  ENTRANCE: {
    label: "Entrance", box: "border-[#d6ccd7] bg-[#f7f4f7]", chipText: "text-[#4a3d4b]",
    iconBg: "bg-[#ece6ec]", iconColor: "text-[#6b5c6c]", icon: DoorOpen, plus: "text-[#6b5c6c] border-[#d6ccd7]",
  },
}
