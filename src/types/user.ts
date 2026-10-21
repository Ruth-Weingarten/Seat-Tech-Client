import type { PermanentDesk } from "./office";

export interface User {
    "id": string,
    "fullName": string,
    "email": string,
    "role": Role,
    "isActive": boolean,
    "joinedAt": string,
    "company": Company,
    "team": Team | null,
    "permanentDesk": PermanentDesk | null
}
export interface Company {
    "id": string,
    "name": string
}
export interface Team {
    "id": string,
    "name": string
}
export type Role = "ADMIN" | "EMPLOYEE";