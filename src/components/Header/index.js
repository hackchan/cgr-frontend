import React, { useContext } from 'react'

import { AppContext } from '../../contex/AppContex'
import '../../styles/Header.css'
import { NavLink } from '../NavLink'
import { FaShoppingBasket } from 'react-icons/fa'
export const Header = () => {
  const { state } = useContext(AppContext)
  const { cart } = state
  return (
    <div className='Header'>
      <h1 className='Header-title'>
        <NavLink to='/'>Analizer App</NavLink>
      </h1>
      <div className='Header-checkout'>
        <NavLink to='/checkout'>
          <FaShoppingBasket size={24} color='white' />
        </NavLink>
        {cart.length > 0 && <div className='Header-alert'>{cart.length}</div>}
      </div>
    </div>
  )
}
