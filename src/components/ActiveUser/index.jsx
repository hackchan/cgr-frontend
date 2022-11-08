import React, { useState, useContext, useEffect } from 'react'
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import { ButtonLoading as Button } from '../ButtonLoading'
import { Logo } from '../Logo'
import { AppContext } from '../../contex/AppProvidercContext'
import { clearMessage } from '../../utils/time'
export const ActiveUser = () => {
  const {
    activeUser
  } = useContext(AppContext)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const handleLogin = () => {
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = { token }
        const data = await activeUser(api)
        setMessage(data.message)
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error.message)
        } else {
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    // call the function
    fetchData()
  }, [])

  if (!token) {
    return <Navigate to='/' />
  }
  return (
    <div className='box loginbox'>
      <div className='avatar'><Logo big /></div>
      <h2>Bienvenido</h2>
      <div>Has activado de forma exitosa tu cuenta en AnalizerApp</div>
      <div className='d-flex p-2 justify-content-center'>
        <Button value={loading ? 'Espere... ⏳' : 'Login'} onClick={handleLogin} />
      </div>
      <div>
        {message && clearMessage(300000, setMessage) && <p><span className='ok'>{message}</span></p>}
        {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
      </div>
    </div>
  )
}
