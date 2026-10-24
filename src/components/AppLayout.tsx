import { Outlet } from "react-router"
import Header from "./Header"

const AppLayout = () => {
  return (
    <>
     <Header></Header>
     <Outlet></Outlet>
    </>
  )
}

export default AppLayout