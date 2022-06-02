import { useState } from 'react'
import initialState from '../initialState'
export const useInitialState = () => {
  const [state, setState] = useState(initialState)
  console.log('state:', state)
  const addToCart = payload => {
    setState({
      ...state,
      cart: [...state.cart, payload]
    })
  }

  const removeToCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter(items => items.id !== payload.id)
    })
  }
  return {
    addToCart,
    removeToCart,
    state
  }
}
