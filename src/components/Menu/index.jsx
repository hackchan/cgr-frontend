import React, { useContext, useState } from 'react'
import '../../styles/Menu.css'
import { AppContext } from '../../contex/AppProvidercContext'
import { MenuContent, MenuList, StyledNavLink, Nav, MenuBurger } from './styles'

export const Menu = () => {
  const [burger, setBurger] = useState(false)
  const { state, logout } = useContext(AppContext)
  const { user } = state

  // const handleBurger = () => {
  //   setBurger(!burger)
  // }

  return (
    <>
      {console.log('burger:', burger)}
      <MenuBurger onClick={() => { setBurger(!burger) }} />
      <Nav>
        <MenuContent burger={burger}>
          <MenuList><StyledNavLink to='/'>Inicio</StyledNavLink></MenuList>
          <MenuList><StyledNavLink to='/satelital'>Satelital</StyledNavLink></MenuList>
          <MenuList><StyledNavLink to='/estructuracion'>Estructuracion</StyledNavLink></MenuList>
          <MenuList>{!user ? <StyledNavLink to='/login'>Iniciar sesión</StyledNavLink> : <StyledNavLink to='/logout' onClick={logout}>Cerrar sesión</StyledNavLink>}</MenuList>
          {/* <li><a href='#'>Notificaciones</a></li> */}

        </MenuContent>
      </Nav>
    </>
  )
}
