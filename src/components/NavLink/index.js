import React from 'react'
import { NavLink as NavLinkReactRouter } from 'react-router-dom'
export const NavLink = ({ to, children, className, ...props }) => {
  return (
    <NavLinkReactRouter
      {...props}
      className={({ isActive }) =>
        [className, isActive ? 'is-active' : null].filter(Boolean).join(' ')}
      to={to}
    >
      {children}
    </NavLinkReactRouter>
  )
}
