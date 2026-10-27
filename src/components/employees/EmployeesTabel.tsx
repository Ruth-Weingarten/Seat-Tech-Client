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
const EmployeesTabel = ({employees,sort,order,onSort,onToggleActive,pendingId}:EmployeesTableProps) => {
    const arrow = (field: EmployeeSort): string => {
        if (field !== sort) return "↕"
        return order === "asc" ? "↑" : "↓"
    }
    if (employees.length === 0) {
    return <p>No employees found.</p>
}
  return (
    <table>
        <thead>
            <tr>
                <th> <button onClick={()=>{onSort("fullName")}} > Name {arrow("fullName")} </button> </th>
                  <th>Email</th> 
                  <th>Team</th>
                  <th> <button onClick={()=>{onSort("createdAt")}}> Joined {arrow("createdAt")} </button> </th>
                  <th>Desk</th>
                 <th>Status</th> 
                 <th></th>
            </tr>
        </thead>
        <tbody>{employees.map((e)=>(<EmployeeRow key={e.id} employee={e} onToggleActive={onToggleActive} isPending={pendingId===e.id}></EmployeeRow>))}</tbody>
    </table>
  )
}

export default EmployeesTabel