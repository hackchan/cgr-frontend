import React from 'react'

import '../../styles/Header.css'
import { NavLink } from '../NavLink'
import { Logo } from '../Logo'
import { Menu } from '../Menu'
import { NavBar } from '../NavBar'
import { HeaderTitle } from './styles'
export const Header = () => {
  return (
    <NavBar />
  //   <div className='Header'>
  //     <NavLink to='/'>
  //       <div className='Header-logo'>
  //         <Logo />
  //         <HeaderTitle>
  //           Analyzer<span>App</span>
  //         </HeaderTitle>
  //       </div>
  //     </NavLink>

  //     <NavBar />
  //     {/* <NavLink to='/checkout'>
  //         <FaShoppingBasket size={24} color='white' />
  //       </NavLink>
  //       {cart.length > 0 && <div className='Header-alert'>{cart.length}</div>} */}

  //   </div>
  )
}
