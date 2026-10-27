import type { User } from "../../types/user";
import { formatDate, initials } from "../../utils/employeeFormat";

interface EmployeeRowProps {
    employee: User;
     onToggleActive: (employee: User) => void;
    isPending: boolean;
}
export const EmployeeRow = ({employee,onToggleActive,isPending}:EmployeeRowProps) => {
  return (
      <tr>
            <td>
                <span>{initials(employee.fullName)}</span>
                <span>{employee.fullName}</span>
                {employee.role === "ADMIN" && <span>Admin</span>}
            </td>
            <td>{employee.email}</td>
            <td>{employee.team?.name ?? "—"}</td>
            <td>{formatDate(employee.joinedAt)}</td>
            <td>{employee.permanentDesk?.label ?? "—"}</td>
            <td>● {employee.isActive ? "Active" : "Inactive"}</td>
            <td>{employee.role !== "ADMIN" && (
        <button type="button" disabled={isPending} onClick={() => onToggleActive(employee)}>
            {employee.isActive ? "Deactivate →" : "Activate →"}
        </button>
    )}</td>
        </tr>
  )
}
export default EmployeeRow