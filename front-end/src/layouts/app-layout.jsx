import React from 'react'
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      Applout
      <Outlet/>
    </div>
  )
}

export default AppLayout;