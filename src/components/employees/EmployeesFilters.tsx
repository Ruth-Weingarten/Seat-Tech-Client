import { EMPLOYEE_STATUSES, type EmployeeStatus } from "../../types/employees";


interface EmployeesFiltersProps {
    search: string;
    status: EmployeeStatus;
    onSearch: (value: string) => void;
    onStatus: (value: EmployeeStatus) => void;
}
const EmployeesFilters = ({search,status,onSearch,onStatus}:EmployeesFiltersProps) => {
  return (
    <div>
  <label> Search  <input placeholder="Name or email" value={search} onChange={(e)=>{onSearch(e.target.value)}} /> </label>
  <label > Status  <select value={status} onChange={(e) => onStatus(e.target.value as EmployeeStatus)}> {EMPLOYEE_STATUSES.map((s)=>(
<option key={s} value={s}>{s}</option>
))} </select> </label>
</div>
  )
}

export default EmployeesFilters