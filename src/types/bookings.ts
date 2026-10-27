export interface Booking {
    id: string;
    date: string;                 
    status: "ACTIVE" | "CANCELLED";
    cancelledByAdmin: boolean;
    desk: { id: string; label: string; areaName: string; floorName: string };
    canCancel: boolean;
    canReplace: boolean;
}