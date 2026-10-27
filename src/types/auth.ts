import type { User } from "./user";

export interface AuthResponse {
    "token": string,
    "user": User,
}
export interface  AuthResponseMe{
    "user": User,
}
export interface Page<T> {
    items: T[];      
    total: number;   
    page: number;   
    pageSize: number;
}
