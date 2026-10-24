
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext'
const ProtectedRoute = () => {
  const auth=useAuth()
  if(!auth.isAuthenticated)
  {
    return(
      <Navigate replace={true} to='/login'></Navigate>
    )
  }
     return (
    <Outlet></Outlet>
  )
  }


export default ProtectedRoute