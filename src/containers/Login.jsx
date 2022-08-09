import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../styles/Login.css'
import { AppContext } from '../contex/AppProvidercContext'
import { useNavigate, Link } from 'react-router-dom'
import { clearMessage } from '../utils/time'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
export const Login = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login } = useContext(AppContext)
  // const clearMessage = async (time = 3000) => {
  //   const timerId = setTimeout(() => setErrorMessage(''), time)
  //   return timerId
  // }
  const onSubmit = async (dataForm) => {
    try {
      await login(dataForm)
      navigate('/', { replace: true })
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error.message)
      } else {
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <div className='loginbox'>
      <div className='avatar'><Logo big /></div>

      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* USERENAME */}
        <label htmlFor='username'>
          Usuario
          <input
            type='text' placeholder='Usuario o correo' name='username' id='username' {...register('username', {
              required: {
                value: true,
                message: 'El Usuario es requerido '
              },
              pattern: {}
            })}
          />
        </label>
        {errors.username && <span className='errors'>{errors.username.message}</span>}
        <br />
        {/* PASSWORD   */}
        <label htmlFor='password'>
          Contraseña
          <input
            type='password' placeholder='Contraseña' name='password' id='password' {...register('password', {
              required: {
                value: true,
                message: 'La Contraseña es requerida '
              },
              pattern: {}
            })}
          />
        </label>

        {errors.password && <span className='errors'>{errors.password.message}</span>}

        <Button value='Iniciar sesión' />
        {errorMessage && clearMessage(3000, setErrorMessage) && <p><span className='errors'>{errorMessage}</span></p>}
        <div>
          <Link to='/recovery'>Olvidó la contraseña?</Link> <br />
          <a href='#'>Crear una cuenta</a>
        </div>

      </form>

    </div>
  )
}
