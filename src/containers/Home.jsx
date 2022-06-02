import React, { useContext } from 'react'

import { AppContext } from '../contex/AppContex'
import { Products } from '../components/Products'

export const Home = () => {
  const { state, addToCart } = useContext(AppContext)
  const { products } = state
  const handleAddToCart = product => () => {
    console.log('lisa:', product)
    addToCart(product)
  }
  return (
    <Products products={products} handleAddToCart={handleAddToCart} />
  )
}
