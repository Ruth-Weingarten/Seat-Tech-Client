import { EMPLOYEE_STATUSES, type EmployeeStatus } from "../../types/employees";


interface EmployeesFiltersProps {
    search: string;
    status: EmployeeStatus;
    onSearch: (value: string) => void;
    onStatus: (value: EmployeeStatus) => void;
}
const EmployeesFilters = ({search,status,onSearch,onStatus}:EmployeesFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 px-7 pt-6 pb-5 border-b border-[#eee8ee]">
  <label className="flex-[1_1_320px] flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-[2px] text-label"> Search  <input placeholder="Name or email" value={search} onChange={(e)=>{onSearch(e.target.value)}} className="bg-transparent border-0 border-b border-[#cfc6cf] py-2.5 text-base font-normal normal-case tracking-normal text-ink outline-none focus:border-brand placeholder:text-[#8a7d8b]" /> </label>
  <label className="flex-[0_1_160px] flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-[2px] text-label"> Status  <select value={status} onChange={(e) => onStatus(e.target.value as EmployeeStatus)} className="bg-transparent border-0 border-b border-[#cfc6cf] py-2.5 text-base font-normal normal-case tracking-normal text-ink capitalize outline-none focus:border-brand cursor-pointer"> {EMPLOYEE_STATUSES.map((s)=>(
<option key={s} value={s}>{s}</option>
))} </select> </label>
</div>
  )
}

export default EmployeesFilters
