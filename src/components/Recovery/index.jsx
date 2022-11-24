import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../contex/AppProvidercContext'
import { LabelBox, InputEmail } from './styles'
import { ButtonLoading as Button } from '../ButtonLoading'
import { useForm } from 'react-hook-form'
import { clearMessage } from '../../utils/time'
import { Logo } from '../Logo'
export const Recovery = () => {
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
  const { recovery } = useContext(AppContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [blockBtn, SetBlockBtn] = useState(false)
  const onSubmit = async (dataForm) => {
    try {
      clearMessage(0, setMessage)
      setLoading(true)
      SetBlockBtn(true)
      const data = await recovery(dataForm)
      // setMessage(data.msn)
      navigate('/reset', { replace: true, state: { msn: data.msn } })
    } catch (error) {
      try {
        if (error.response.data) {
          setMessage(error.response.data.error.message)
        } else if (error.request.data) {
          console.log('error request :(')
          setMessage(error.request.data.error.message)
        } else {
          console.log('homero error:', error.message)
          setMessage(error.message)
        }
      } catch (error) {
        setMessage(error.message)
      }
    } finally {
      setLoading(false)
      SetBlockBtn(false)
    }
  }
  return (
    <div className='box'>
      <div className='avatar'><Logo big /></div>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='email'>
          Ingrese la dirección de correo electrónico verificada de su cuenta de usuario y le enviaremos un enlace para restablecer la contraseña.
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
          <Button value={loading ? '⏳ espera...' : 'Enviar link al Correo'} loading={loading} disabled={blockBtn} />
        </div>

      </form>

    </div>
  )
}
