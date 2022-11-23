import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../contex/AppProvidercContext'
import { LabelBox, InputEmail } from './styles'
import { ButtonLoading as Button } from '../ButtonLoading'
import { useForm } from 'react-hook-form'
import { clearMessage } from '../../utils/time'
import { Spinner } from '../Spinner'
import { Logo } from '../Logo'
export const VerifyEmail = () => {
  /**
   *  if (error.response) {
        console.log('entro al error:', error.response.data.error.message)
        setMessage(error.response.data.error.message)
      } else if (error.request) {
        console.log('error request :(')
        setMessage(error.request)
      } else {
        console.log('homero error:', error.message)
        setMessage(error.message)
      }
   */
  const navigate = useNavigate()
  const { validateEmail } = useContext(AppContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmit = async (dataForm) => {
    try {
      console.log('dataform:', dataForm)
      clearMessage(0, setMessage)
      setLoading(true)
      const data = await validateEmail(dataForm)
      console.log('la data:', data)
      // setMessage(data.msn)
      navigate('/newuser-entidad', { replace: true, state: { email: data.email, entidadId: data.entidad.id, name: data.entidad.name, nit: data.entidad.nit } })
    } catch (error) {
      try {
        if (error.message && !error.response.data.error.message) {
          setMessage(error.message)
        } else if (error.response.data) {
          console.log('UNO')
          setMessage(error.response.data.error.message)
        } else if (error.request.data) {
          console.log('DOS')
          setMessage(error.request.data.error.message)
        } else {
          console.log('TRES')
          setMessage(error.message)
        }
      } catch (err) {
        console.log('CUATRO')
        setMessage(err.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='box'>
      <div className='avatar'><Logo big /></div>
      <h2>Validar Email</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='email'>
          Ingrese la dirección de correo electrónico institucional con la cual desea crear una cuenta con la CGR.
          <InputEmail
            type='text' placeholder='Enter your email address' id='email' name='email' {...register('email', {
              required: {
                value: true,
                message: 'El campo email es requerido '
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'No es un email valido'
              }
            })}
          />
        </LabelBox>
        {loading && <Spinner />}
        {message && clearMessage(30000, setMessage) && <p><span className='errors'>{message}</span></p>}
        {/* {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>} */}
        {errors.email
          ? (
            <>
              {errors.email.type === 'required' && (
                <p className='errors'>
                  {errors.email.message}
                </p>
              )}
              {errors.email.type === 'pattern' && (
                <p className='errors'>
                  {errors.email.message}
                </p>
              )}
            </>
            )
          : null}
        <div className='btncenter'>
          <Button value='Verificar Email' />
        </div>

      </form>

    </div>
  )
}
