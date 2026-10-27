import { Outlet } from "react-router"
import Header from "./Header"

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-page">
     <Header></Header>
     <Outlet></Outlet>
    </div>
  )
}

export default AppLayout
