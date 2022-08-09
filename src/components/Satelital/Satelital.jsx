import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Button'
import { clearMessage, navegateTime } from '../../utils/time'
import { LabelBox, InputEmail } from './styles'
import { Spinner } from '../Spinner'
export const Satelital = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmit = async (dataForm) => {

  }
  return (
    <div className='box'>
      <h2>Gestion Satelital</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='email'>
          Nombre de satelital.
          <InputEmail
            type='text' placeholder='Digite el nombre de la satelital' id='email' name='email' {...register('email', {
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
                <p className='errors alert'>
                  {errors.email.message}
                </p>
              )}
            </>
            )
          : null}
        <div className='btncenter'>
          <Button value='Guardar' />
        </div>

      </form>
    </div>
  )
}
