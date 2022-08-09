import React from 'react'
import { AppContext } from '../../contex/AppProvidercContext'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage'
export const ProtectedRoute = ({ children }) => {
  const [user] = useLocalStorage('user', false)
  // const [user, setUser] = useState(() => {
  //   try {
  //     const item = window.localStorage.getItem('user')
  //     return item != null ? JSON.parse(item) : false
  //   } catch (error) {
  //     return false
  //   }
  // })
  // useEffect(() => {
  //   const userSesion = checkSession()
  //   setUser(userSesion)
  // }, [user])

  if (!user) {
    return <Navigate to='/login' />
  } else return children
}
