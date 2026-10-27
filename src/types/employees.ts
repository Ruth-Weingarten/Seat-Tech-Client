export const EMPLOYEE_STATUSES = ["active", "inactive", "all"] as const;
export type EmployeeStatus = "active" | "inactive" | "all";
export type EmployeeSort = "fullName" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface EmployeesQuery {
    search?: string;
    status: EmployeeStatus;
    sort: EmployeeSort;
    order: SortOrder;
    page: number;
    pageSize: number;
}
