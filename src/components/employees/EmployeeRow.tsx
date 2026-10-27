import type { User } from "../../types/user";
import { formatDate, initials } from "../../utils/employeeFormat";

interface EmployeeRowProps {
    employee: User;
     onToggleActive: (employee: User) => void;
    isPending: boolean;
}
const tdClass = "py-3.5 pr-4 border-b border-[#f1ecf1] whitespace-nowrap"

export const EmployeeRow = ({employee,onToggleActive,isPending}:EmployeeRowProps) => {
  return (
      <tr className={employee.isActive ? "" : "text-[#8a7d8b]"}>
            <td className={tdClass}>
                <div className="flex items-center gap-3">
                <span className={`size-9 flex items-center justify-center text-xs font-bold text-white ${employee.isActive ? (employee.role === "ADMIN" ? "bg-ink" : "bg-tile") : "bg-[#a99ea9]"}`}>{initials(employee.fullName)}</span>
                <span className="font-semibold">{employee.fullName}</span>
                {employee.role === "ADMIN" && <span className="bg-brand text-white text-[10px] font-bold uppercase tracking-[2px] px-2 py-0.5">Admin</span>}
                </div>
            </td>
            <td className={tdClass}>{employee.email}</td>
            <td className={tdClass}>{employee.team?.name ?? "—"}</td>
            <td className={tdClass}>{formatDate(employee.joinedAt)}</td>
            <td className={tdClass}>{employee.permanentDesk ? <span className="font-mono text-sm bg-brand-soft text-[#a30d48] px-2 py-1">{employee.permanentDesk.label}</span> : <span className="text-[#b3a8b3]">—</span>}</td>
            <td className={tdClass}><span className="inline-flex items-center gap-2"><span className={`size-2 rounded-full ${employee.isActive ? "bg-[#1f9d5c]" : "bg-[#a99ea9]"}`}></span>{employee.isActive ? "Active" : "Inactive"}</span></td>
            <td className={`${tdClass} text-right`}>{employee.role !== "ADMIN" && (
        <button type="button" disabled={isPending} onClick={() => onToggleActive(employee)} className="font-bold text-brand hover:text-brand-dark disabled:opacity-50 cursor-pointer">
            {employee.isActive ? "Deactivate →" : "Activate →"}
        </button>
    )}</td>
        </tr>
  )
}
export default EmployeeRow
