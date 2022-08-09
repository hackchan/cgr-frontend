import React, { useContext } from 'react'

import { AppContext } from '../contex/AppProvidercContext'
import { Products } from '../components/Products'
import { Table } from '../components/Table'

export const Home = () => {
  console.log('component HOME')
  const { state, addToCart } = useContext(AppContext)
  const { movies } = state
  const handleAddToCart = product => () => {
    console.log('lisa:', product)
    addToCart(product)
  }
  return (

    <Products products={movies} handleAddToCart={handleAddToCart} />
  )
}
