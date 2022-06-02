import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import { Footer } from '../Footer'
import '../../styles/Layout.css'
export const Layout = () => {
  return (
    <div className='Main'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
