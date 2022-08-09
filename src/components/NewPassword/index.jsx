import React, { useState, useContext } from 'react'
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import { AppContext } from '../../contex/AppProvidercContext'
import { useForm } from 'react-hook-form'
import { Button } from '../Button'
import { PassBox, EyeInvisible, EyeVisible, InputPass } from './styles'
import { clearMessage, navegateTime } from '../../utils/time'
import { Spinner } from '../Spinner'
export const NewPassword = () => {
  const { changePass } = useContext(AppContext)
  const [messageChange, setmessageChange] = useState('')
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { watch, register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' })
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const IconEyePass = visible ? EyeVisible : EyeInvisible
  const IconEyePassConfirm = visibleConfirm ? EyeVisible : EyeInvisible
  const password = watch('password')
  const onSubmit = async (dataForm) => {
    try {
      clearMessage(0, setMessage)
      setLoading(true)
      dataForm.token = token
      const response = await changePass(dataForm)
      setmessageChange(response.message)
      navegateTime(3000, navigate, '/login', { msn: response.message })
      // navigate('/login', { replace: true, state: { msn: response.message } })
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error.message)
      } else {
        setMessage(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  console.log('params:', token)
  if (!token) {
    return <Navigate to='/' />
  }
  return (
    <div className='box'>
      <img className='avatar' src='https://i.ibb.co/fvZ0bL9/logo-cgr.png' alt='cgr' />
      <h2>Crear una nueva contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PassBox>
          <label htmlFor='password'>
            contraseña
            <InputPass
              type={visible ? 'text' : 'password'} placeholder='digite contraseña' name='password' id='password' {...register('password', {
                // pattern: {
                //   value: /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]{10,16}$/,
                //   message: 'Password should include at least one uppercase, one numeric value and one special character'
                // },
                required: {
                  value: true,
                  message: 'El campo contraseña es requerido '
                },
                minLength: {
                  value: 8,
                  message: 'La constrasena debe ser de almenos 8 caracteres'
                }
              })}

            />
            <IconEyePass onClick={() => { setVisible(!visible) }} />
          </label>

          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

        </PassBox>
        <PassBox>
          <label htmlFor='repassword'>
            confirmar contraseña
            <InputPass
              type={visibleConfirm ? 'text' : 'password'} placeholder='digite confirmar contraseña' name='repassword' id='repassword' {...register('repassword', {
                required: {
                  value: true,
                  message: 'El campo confirmacion es requerido '
                },
                minLength: {
                  value: 8,
                  message: 'La confirmacion debe ser de almenos 8 caracteres'
                },
                validate: (value) =>
                  value === password || 'La contraseña y la confirmacion no coinciden'
              })}
            />
            <IconEyePassConfirm onClick={() => { setVisibleConfirm(!visibleConfirm) }} />
          </label>
          {errors.repassword && <p style={{ color: 'red' }}>{errors.repassword.message}</p>}
        </PassBox>
        {loading && <Spinner />}
        {message && clearMessage(3000, setMessage) && <p><span className='errors'>{message}</span></p>}
        {messageChange && <p><span className='ok'>{messageChange}</span> </p>}
        <div className='btncenter'>
          <Button className={loading && 'btnoff'} value='Cambiar contraseña' />
        </div>

      </form>
    </div>
  )
}
