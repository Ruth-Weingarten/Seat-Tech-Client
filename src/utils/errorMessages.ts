import axios from "axios";
import type { ApiErrorBody } from "../types/api";

export const errorMessages: Record<string, string> = {
  // General
  VALIDATION_ERROR: "Some fields are invalid. Please check the form",
  TOO_MANY_REQUESTS: "Too many attempts. Please try again in a few minutes",
  INTERNAL_ERROR: "Something went wrong on the server. Please try again",
  NOT_FOUND: "The item you're looking for doesn't exist",
  ROUTE_NOT_FOUND: "The item you're looking for doesn't exist",

  // Login and register
  INVALID_CREDENTIALS: "Wrong email or password",
  ACCOUNT_INACTIVE: "Your account has been deactivated. Contact your company admin",
  EMAIL_TAKEN: "This email is already registered",
  INVALID_JOIN_CODE: "This join code is not valid. Check it with your company admin",

  // Map: booking and cancelling
  DESK_TAKEN: "This desk was just booked by someone else",
  ALREADY_BOOKED: "You already have a booking for this day",
  DESK_IN_MAINTENANCE: "This desk is under maintenance",
  DESK_IS_PERMANENT: "This desk is assigned to someone permanently",
  HAS_PERMANENT_DESK: "You have a permanent desk, so you can't book another",
  AREA_RESTRICTED: "This area is reserved for other teams",
  DATE_NOT_ALLOWED: "Bookings are only open for the next working day",
  CANCEL_DEADLINE_PASSED: "It's too late to cancel this booking",
  CHANGE_DEADLINE_PASSED: "It's too late to change this booking",
  BOOKING_NOT_ACTIVE: "This booking was already cancelled",
  NOT_YOUR_BOOKING: "You can only cancel your own bookings",
  SAME_DESK: "You already booked this desk",

  // Office management: desks
  DESK_LABEL_TAKEN: "A desk with this number already exists",
  DESK_OUTSIDE_AREA: "The desk must be inside its area",
  DESK_IN_SERVICE_AREA: "Desks can't be placed in service areas",
  DESKS_SAME_CELL: "Another desk is already in this spot",
  DESK_HAS_BOOKINGS: "This desk has active bookings and can't be deleted",
  LAYOUT_INVALID: "Some items on the map are out of place",
  EMPLOYEE_HAS_PERMANENT_DESK: "This employee already has a permanent desk",
  EMPLOYEE_INACTIVE: "This employee is deactivated",

  // Office management: floors and areas (full plan)
  FLOOR_NAME_TAKEN: "A floor with this name already exists",
  FLOOR_LEVEL_TAKEN: "A floor with this level already exists",
  FLOOR_NOT_EMPTY: "Remove the floor's areas before deleting it",
  AREA_NAME_TAKEN: "An area with this name already exists on this floor",
  AREA_NOT_EMPTY: "Remove the area's desks before deleting it",
  AREA_HAS_DESKS: "Remove the area's desks before deleting it",
  AREA_OUT_OF_FLOOR: "The area must fit inside the floor",
  AREAS_OVERLAP: "Areas can't overlap",

  // Employees and teams (full plan)
  CANNOT_DEACTIVATE_ADMIN: "You can't deactivate yourself",
  TEAM_NAME_TAKEN: "A team with this name already exists",
};
export const getErrorMessage=(error:Error|null)=>
{
if(axios.isAxiosError<ApiErrorBody>(error)) {
    if(!error?.response)
    {
        return "Can’t reach the server. Check your connection and try again"
    }
    const code=error.response?.data?.error?.code;
    if(code&&errorMessages[code])
    {
        return errorMessages[code]
    }
    return "Something went wrong. Please try again"
}

    return "Something went wrong. Please try again";

}