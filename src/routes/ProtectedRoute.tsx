import React from 'react'
import { Outlet } from 'react-router'
const ProtectedRoute = () => {
  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute