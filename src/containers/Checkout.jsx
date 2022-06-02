import React, { useContext } from 'react'
import '../styles/Checkout.css'
import { NavLink } from '../components/NavLink'
import { AppContext } from '../contex/AppContex'
import { FaTrash } from 'react-icons/fa'
export const Checkout = () => {
  const { state, removeToCart } = useContext(AppContext)
  const { cart } = state
  console.log('state final:', cart)
  const handleRemove = product => () => {
    removeToCart(product)
  }

  const handleSumTotal = () => {
    const reducer = (acumulator, currentvalue) => acumulator + currentvalue.price
    const sum = cart.reduce(reducer, 0)
    return sum
  }
  return (
    <div className='Checkout'>
      <div className='Checkout-content'>
        {cart.length > 0 ? <h3>Lista de Pedidos:</h3> : <h3>No hay productos en el carrito</h3>}
        {cart.map((item) => (
          <div className='Checkout-item' key={item.id}>
            <div className='Checkout-element'>
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
            <button type='button' onClick={handleRemove(item)}><FaTrash /></button>
          </div>
        ))}

      </div>
      {cart.length > 0 && (
        <div className='Checkout-sidebar'>
          <h3>{`Precio total $${handleSumTotal()}`}</h3>
          <NavLink to='/information'>
            <button type='button'><FaTrash>Continuar pedido</FaTrash></button>
          </NavLink>

        </div>)}

    </div>
  )
}
