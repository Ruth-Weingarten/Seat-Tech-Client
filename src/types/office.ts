export interface PermanentDesk {
    id:string,
    label:string
    , areaId:string
    , areaName:string, 
    floorId:string
    , floorName:string
}
export type AreaType =
  | "DEV_ROOM"
  | "OPEN_SPACE"
  | "QUIET_ROOM"
  | "KITCHEN"
  | "RESTROOM"
  | "BALCONY"
  | "MEETING_ROOM"
  | "ENTRANCE";

export type DeskStatus = "ACTIVE" | "MAINTENANCE";

export type DeskState =
  | "AVAILABLE"
  | "BOOKED"
  | "MINE"
  | "PERMANENT"
  | "PERMANENT_MINE"
  | "MAINTENANCE"
  | "RESTRICTED";

export type OperatingSystem = "WINDOWS" | "MACOS" | "LINUX";

export type Software =
  | "VS_CODE"
  | "VISUAL_STUDIO"
  | "INTELLIJ"
  | "DOCKER"
  | "FIGMA"
  | "OFFICE"
  | "POSTMAN";

export type AccessibilityFeature =
  | "WHEELCHAIR_ACCESSIBLE"
  | "ADJUSTABLE_HEIGHT"
  | "ERGONOMIC_CHAIR"
  | "LARGE_MONITOR";

export type Rotation = 0 | 90 | 180 | 270;
export interface Floor {
  id: string;
  name: string;
  level: number;
  gridWidth: number;
  gridHeight: number;
  areaCount: number;
  deskCount: number;
}

export interface Area {
  id: string;
  floorId: string;
  name: string;
  type: AreaType;
  typeLabel: string; 
  isWorkspace: boolean;
  color: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isRestricted: boolean;
  teamIds: string[];
  deskCount: number;
}

export interface PermanentUser {
  id: string;
  fullName: string;
}

export interface Desk {
  id: string;
  label: string;
  areaId: string;
  areaName: string;
  areaType: AreaType;
  areaTypeLabel: string; // from the server, in Hebrew – not displayed
  floorId: string;
  floorName: string;
  x: number;
  y: number;
  rotation: Rotation;
  status: DeskStatus;
  os: OperatingSystem;
  software: Software[];
  accessibility: AccessibilityFeature[];
  permanentUser: PermanentUser | null;
}

export interface DeskWithState extends Desk {
  state: DeskState;
  bookedByName: string | null;
  bookingId: string | null;
  canBook: boolean;
}

export interface MyBooking {
  id: string;
  deskId: string;
}

export interface FloorMap {
  floor: Floor;
  date: string;
  bookingDate: string;
  isBookingDate: boolean;
  hasPermanentDesk: boolean;
  myBooking: MyBooking | null;
  areas: Area[];
  desks: DeskWithState[];
}
export interface NewFloor
{
  "name": string,
  "level":number,
  "gridWidth": number,
  "gridHeight": number
}

// Body of PUT /api/floors/{id}/layout: new positions after a drag
export interface LayoutChange {
  areas: { id: string; x: number; y: number; width: number; height: number }[];
  desks: { id: string; x: number; y: number }[];
}
