
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext'

const AdminRoute = () => {
  const auth=useAuth()
  if(auth.user?.role!='ADMIN')
  {
    return(
      <Navigate replace={true} to='/map'></Navigate>
    )
  }
     return (
    <Outlet></Outlet>
  )
}

export default AdminRoute