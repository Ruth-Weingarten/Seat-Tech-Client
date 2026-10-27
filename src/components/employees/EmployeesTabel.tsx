import type { EmployeeSort, SortOrder } from "../../types/employees";
import type { User } from "../../types/user";
import EmployeeRow from "./EmployeeRow";

interface EmployeesTableProps {
    employees: User[];
    sort: EmployeeSort;
    order: SortOrder;
    onSort: (field: EmployeeSort) => void;
    onToggleActive: (employee: User) => void;
    pendingId: string | null;
}
const thClass = "px-0 pr-4 pt-[18px] pb-3 text-left text-xs font-semibold uppercase tracking-[2px] text-label border-b border-[#eee8ee] whitespace-nowrap"
const sortClass = (active: boolean) => `uppercase tracking-[2px] font-semibold cursor-pointer hover:text-brand ${active ? "text-brand" : "text-label"}`

const EmployeesTabel = ({employees,sort,order,onSort,onToggleActive,pendingId}:EmployeesTableProps) => {
    const arrow = (field: EmployeeSort): string => {
        if (field !== sort) return "↕"
        return order === "asc" ? "↑" : "↓"
    }
    if (employees.length === 0) {
    return <p className="px-7 py-10 text-center text-muted">No employees found.</p>
}
  return (
    <div className="overflow-x-auto px-7">
    <table className="w-full border-collapse text-base">
        <thead>
            <tr>
                <th className={thClass}> <button onClick={()=>{onSort("fullName")}} className={sortClass(sort === "fullName")}> Name {arrow("fullName")} </button> </th>
                  <th className={thClass}>Email</th>
                  <th className={thClass}>Team</th>
                  <th className={thClass}> <button onClick={()=>{onSort("createdAt")}} className={sortClass(sort === "createdAt")}> Joined {arrow("createdAt")} </button> </th>
                  <th className={thClass}>Desk</th>
                 <th className={thClass}>Status</th>
                 <th className={thClass}></th>
            </tr>
        </thead>
        <tbody>{employees.map((e)=>(<EmployeeRow key={e.id} employee={e} onToggleActive={onToggleActive} isPending={pendingId===e.id}></EmployeeRow>))}</tbody>
    </table>
    </div>
  )
}

export default EmployeesTabel
