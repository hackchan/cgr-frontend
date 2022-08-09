import { useContext, useEffect } from 'react'
import { AppContext } from '../../contex/AppProvidercContext'

export const CheckSession = () => {
  const { checkSession } = useContext(AppContext)
  useEffect(() => {
    checkSession()
  }, [])
}
