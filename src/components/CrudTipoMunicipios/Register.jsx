import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LabelBox, Input, BoxForm } from '../../styles/box'
import { ButtonLoading as Button } from '../ButtonLoading'
import { clearMessage } from '../../utils/time'
import { Logo } from '../Logo'

export const Register = ({ setModal, setReload, preData, AddTipoMunicipios, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm()

  const onSubmit = async (dataForm) => {
    try {
      setDisableBtn(true)
      await AddTipoMunicipios(dataForm)
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
    <BoxForm modedark={modedark}>
      <div className='avatar'><Logo big /></div>
      <h2>{preData.register}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='tipo' modedark={modedark}>
          Ingrese el nombre del {preData.table}
          <Input
            type='text' placeholder='Nombre del tipo departamento' id='name' name='name' {...register('name', {
              required: {
                value: true,
                message: 'El nombre del tipo de departamento es requerido '
              }

            })}
          />
        </LabelBox>
        {/* {loading && <Spinner />}
        {message && clearMessage(30000, setMessage) && <p><span className='errors'>{message}</span></p>} */}
        {/* {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>} */}
        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        {errors.name && (
          <div className='errors' onClick={() => clearErrors('name')}>
            {errors.name.message}
          </div>
        )}

        <Button modedark={modedark} value={preData.buttonRegister} disabled={disableBtn} loading={disableBtn} />

      </form>

    </BoxForm>
  )
}
