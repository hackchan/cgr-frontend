import React, { createContext } from 'react'
import { useInitialState } from '../hooks/useInitialState'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const initialState = useInitialState()
  console.log('initial state:', initialState)

  return (
    <AppContext.Provider value={initialState}>
      {children}
    </AppContext.Provider>
  )
}
