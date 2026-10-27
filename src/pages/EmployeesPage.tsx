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
import { Armchair, KeyRound, Users } from "lucide-react"
import PageHero from "../components/PageHero"
import { useConfirm } from "../hooks/useConfirm"

const PageSise=10
const cardIcon = "size-8 text-[#ffd6e6]"
const cardAction = "font-bold text-brand hover:text-brand-dark no-underline cursor-pointer disabled:opacity-50"

const EmployeesPage = () => {
const createCode = useNewJoinCode()
const {data:company} = useCompany()
const updateEmployee = useUpdateEmployee()
const { confirm, dialog } = useConfirm()
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
async function handleNewCode()
{
  if (await confirm({ title: "Create a new join code?", message: "The current code will stop working. Employees who haven't registered yet will need the new one.", confirmText: "Create new code" })) {
        createCode.mutate()
    }
}
async function handleToggleActive(employee: User) {
    if (employee.isActive &&
        !(await confirm({ title: `Deactivate ${employee.fullName}?`, message: "Their upcoming bookings will be cancelled and their permanent desk released.", confirmText: "Deactivate", danger: true }))) {
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
      {dialog}
      <PageHero headline="Your people." tagline="All in one place.">Invite, find and manage everyone in {company?.name ?? "your company"}.</PageHero>
      <main className="relative mx-auto max-w-[1200px] -mt-[84px] px-4 sm:px-10 pb-14 flex flex-col gap-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
        <StatCard icon={<KeyRound className={cardIcon} strokeWidth={1.5} aria-hidden="true" />} label="Join code" value={company?.joinCode ?? "—"}>
    <button type="button" onClick={handleNewCode} disabled={createCode.isPending} className={cardAction}>New code →</button>
</StatCard>
<StatCard icon={<Users className={cardIcon} strokeWidth={1.5} aria-hidden="true" />} label="Active" value={`${activeCount} ${activeCount === 1 ? "employee" : "employees"}`}>
    <button type="button" onClick={()=>{handleStatus("inactive")}} className={cardAction}>Show inactive →</button>
</StatCard>
<StatCard icon={<Armchair className={cardIcon} strokeWidth={1.5} aria-hidden="true" />} label="Permanent desks" value={`${assignedCount} assigned`}>
   <Link to="/admin/office" className={cardAction}>Open the office →</Link>
</StatCard>
        </div>
<ErrorMessage error={createCode.error} />
        <section className="bg-white border border-line">
        <EmployeesFilters search={search} status={status} onSearch={handleSearch} onStatus={handleStatus} />
        <div className="px-7 empty:hidden flex flex-col gap-3 pt-4">
        {isLoading && <Loading text="Loading employees..." />}
        <ErrorMessage error={error} />
   {notice && <p role="status" className="text-sm text-[#1f7a4d] bg-[#e6f5ec] px-3.5 py-2.5 rounded-lg">{notice}</p>}
<ErrorMessage error={updateEmployee.error} />
        </div>
        {data && <>
    <EmployeesTabel employees={data.items} sort={sort} order={order} onSort={handleSort} onToggleActive={handleToggleActive } pendingId={pendingId}/>
    <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPage={setPage} />
</>}
        </section>
      </main>
</>
  )
}

export default EmployeesPage
