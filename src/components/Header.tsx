import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
import { useCompany } from "../hooks/useCompany"
import Logo from "./Logo"

const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center text-base font-semibold no-underline border-b-[3px] pt-[3px] ${isActive ? "text-brand border-brand" : "text-ink border-transparent hover:text-brand"}`

const Header = () => {
     const { user, logout } = useAuth();
     const { data: company } = useCompany();
        const navigate = useNavigate();
        const handleLogout=()=>
        {
            logout();
            navigate('/login')
        }
    return <header>
        <div className="bg-ink text-[#e9e3ea] text-[13px]">
            <div className="mx-auto max-w-[1480px] px-4 sm:px-8 py-[7px] flex justify-end gap-4">
                <span>{company?.name}</span>
                <span className="opacity-40">|</span>
                <span>{user?.fullName} · {user?.role === "ADMIN" ? "Admin" : "Employee"}</span>
            </div>
        </div>
        <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-[1480px] px-4 sm:px-8 min-h-[76px] flex flex-wrap items-stretch gap-x-9 gap-y-2">
        <Logo />
        <nav className="flex flex-wrap items-stretch gap-x-7" aria-label="Main">
            <NavLink to="/map" className={navClass}>Company map</NavLink>
            <NavLink to='/my-bookings' className={navClass}>My bookings</NavLink>
            {user?.role === 'ADMIN' && <>
                <NavLink to='/admin/office' className={navClass}>Office</NavLink>
                <NavLink to="/admin/employees" className={navClass}>Employees</NavLink>
            </>}
        </nav>
        <div className="flex-1"></div>
        <div className="flex items-center">
        <button onClick={handleLogout} className="bg-brand hover:bg-brand-dark text-white font-bold text-[15px] px-[22px] py-3 cursor-pointer transition-colors">Log out</button></div>
        </div>
        </div>
    </header>
}

export default Header
