import { Link, NavLink, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"


const Header = () => {
     const { user, logout } = useAuth();
        const navigate = useNavigate();
        const handleLogout=()=>
        {
            logout();
            navigate('/login')
        }
    return <header className="header">
        <Link className="logo" to='/'>SEAT-TECH</Link>
        <nav className="nav">
            <NavLink to="/map">company map</NavLink>
            <NavLink to='/my-bookings'>my bookings</NavLink>
            {user?.role === 'ADMIN' && <>
                <NavLink to='/admin/office'>office</NavLink>
                <NavLink to="/admin/employees">employees</NavLink>
                <NavLink to='/admin/bookings'>all bookings</NavLink>
            </>}
        </nav>
        <div className="header-user">
        <div>welcome {user?.fullName}</div>
        <button onClick={handleLogout}>Log out</button></div>
    </header>
}

export default Header