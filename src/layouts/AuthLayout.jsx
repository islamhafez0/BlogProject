import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <main className='auth-layout'>
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
