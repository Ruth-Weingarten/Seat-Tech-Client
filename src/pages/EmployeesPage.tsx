import { useState } from "react"
import type { EmployeeSort, EmployeesQuery, EmployeeStatus, SortOrder } from "../types/employees"
import { useEmployees } from "../hooks/useEmployees"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import EmployeesFilters from "../components/employees/EmployeesFilters"
import EmployeesTabel from "../components/employees/EmployeesTabel"
import Pagination from "../components/Pagination"
import { useNewJoinCode } from "../hooks/useNewJoinCode"
import StatCard from "../components/employees/StatCard"
import { useCompany } from "../hooks/useCompany"
import { useUpdateEmployee } from "../hooks/useUpdateEmplyee"
import type { User } from "../types/user"
import { Link } from "react-router"
import { SUMMERY_QUERY } from "../utils/employees"

const PageSise=10

const EmployeesPage = () => {
const createCode = useNewJoinCode()
const {data:company} = useCompany()
const updateEmployee = useUpdateEmployee()
const { data: summary } = useEmployees(
SUMMERY_QUERY
)
const activeCount = summary?.total ?? 0
const assignedCount = summary?.items.filter((u) => u.permanentDesk).length ?? 0
const [notice,setNotice]=useState<string>("")
const [search, setSearch] = useState("")
const [status, setStatus] = useState<EmployeeStatus>("active")
const [sort, setSort] = useState<EmployeeSort>("fullName")
const [order, setOrder] = useState<SortOrder>("asc")
const [page, setPage] = useState(1)
const query: EmployeesQuery ={
    search: search,
    status: status,
    sort: sort,
    order: order,
    page: page,
    pageSize: PageSise
}
const {data, isLoading, error}=useEmployees(query)
function handleSearch(value:string)
{
 setSearch(value)
 setPage(1)
}
function handleStatus(value:EmployeeStatus)
{
 setStatus(value)
 setPage(1)
}
function handleSort(filed:EmployeeSort)
{
 if(filed===sort)
 {
   setOrder(order==="asc"?"desc":"asc")
 }
 else
  {
setSort(filed)
setOrder("asc")
  }
 setPage(1)
}
function handleNewCode()
{
  if (window.confirm("Create a new join code? The current code will stop working.")) {
        createCode.mutate()
    }
}
function handleToggleActive(employee: User) {
    if (employee.isActive &&
        !window.confirm(`Deactivate ${employee.fullName}? Their upcoming bookings will be cancelled and their permanent desk released.`)) {
        return
    }
    setNotice("")
    updateEmployee.mutate(
        { id: employee.id, isActive: !employee.isActive },
        {
            onSuccess: (res) => {
                if (res.employee.isActive) {
                    setNotice(`${res.employee.fullName} was activated`)
                } else {
                    setNotice(`${res.employee.fullName} was deactivated. ${res.cancelledBookings} upcoming bookings were cancelled`)
                }
            }
        }
    )
}
const pendingId = updateEmployee.isPending ? updateEmployee.variables?.id ?? null : null
  return (
      <>
        {isLoading && <Loading text="Loading employees..." />}
        <ErrorMessage error={error} />
        <StatCard icon="j" label="JOIN CODE" value={company?.joinCode ?? "—"}>
    <button type="button" onClick={handleNewCode} disabled={createCode.isPending}>New code →</button>
</StatCard>
<StatCard icon="a" label="ACTIVE" value={`${activeCount} ${activeCount === 1 ? "employee" : "employees"}`}>
    <button type="button" onClick={()=>{handleStatus("inactive")}} >Show Inactive →</button>
</StatCard>
<StatCard icon="p" label="PERMANENT DESKS" value={`${assignedCount} assigned`}>
   <Link to="/admin/office">Open the office →</Link>
</StatCard>
<ErrorMessage error={createCode.error} />
        <EmployeesFilters search={search} status={status} onSearch={handleSearch} onStatus={handleStatus} />
        {data && <>
   {notice && <p>{notice}</p>}
<ErrorMessage error={updateEmployee.error} />
    <EmployeesTabel employees={data.items} sort={sort} order={order} onSort={handleSort} onToggleActive={handleToggleActive } pendingId={pendingId}/>
    <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPage={setPage} />
</>}
</>
  )
}

export default EmployeesPage