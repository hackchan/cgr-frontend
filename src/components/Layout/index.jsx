import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { CheckSession } from '../CheckSession'

export const Layout = () => {
  return (
    <div className='Main'>
      <CheckSession />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
