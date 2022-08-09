import React, { useContext, useState } from 'react'
import { AppContext } from '../../contex/AppProvidercContext'
import { useForm } from 'react-hook-form'
import { LabelBox, InputEmail, BoxForm } from './styles'
import { ButtonLoading as Button } from '../ButtonLoading'
import { clearMessage } from '../../utils/time'
// import { clearMessage } from '../../utils/time'
import { Logo } from '../Logo'

export const Register = ({ setModal, setReload, preData }) => {
  const { AddSatelitales } = useContext(AppContext)
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (dataForm) => {
    try {
      setDisableBtn(true)
      console.log('dataForm:', dataForm)
      await AddSatelitales(dataForm)
      setModal(false)
      setReload(true)
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error.message)
      } else {
        setError(error.message)
      }
      // setError(error.message)
    } finally {
      setDisableBtn(false)
    }
  }
  return (
    <BoxForm>
      <div className='avatar'><Logo big /></div>
      <h2>{preData.windowsTitle}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='satelital'>
          Ingrese el nombre de la satelital
          <InputEmail
            type='text' placeholder='Nombre de la satelital' id='satelital' name='satelital' {...register('satelital', {
              required: {
                value: true,
                message: 'El nombre de la satelital es requerido '
              }
              // pattern: {
              //   value: /^[A-Z0-9]$/i,
              //   message: 'No es un nombre válido'
              // }
            })}
          />
        </LabelBox>
        {/* {loading && <Spinner />}
        {message && clearMessage(30000, setMessage) && <p><span className='errors'>{message}</span></p>} */}
        {/* {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>} */}
        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        {errors.satelital
          ? (
            <>
              {errors.satelital.type === 'required' && (
                <p className='errors'>
                  {errors.satelital.message}
                </p>
              )}
              {errors.satelital.type === 'pattern' && (
                <p className='errors alert'>
                  {errors.satelital.message}
                </p>
              )}
            </>
            )
          : null}

        <Button value='Crear Satelital' disabled={disableBtn} loading={disableBtn} />

      </form>

    </BoxForm>
  )
}
