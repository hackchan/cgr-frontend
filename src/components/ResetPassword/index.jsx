import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Title, ReturnButton } from './styles'
import { Logo } from '../Logo'
export const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.state == null) {
      navigate('/login', { replace: true })
    }
  }, [])

  return (
    <Box>
      <div className='avatar'><Logo big /></div>
      <Title>Restablecer su contraseña</Title>
      <div>
        <p>{location.state?.msn}</p>
        <ReturnButton to='/login'> Regresar a Iniciar  sesión</ReturnButton>
      </div>
    </Box>
  )
}
