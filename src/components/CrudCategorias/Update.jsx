import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LabelBox, Input, BoxForm } from '../../styles/box'
import { ButtonLoading as Button } from '../ButtonLoading'
import { clearMessage } from '../../utils/time'
import { Logo } from '../Logo'

export const Update = ({ setModal, setReload, preData, data, UpdateCategoria, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({ mode: 'onBlur', defaultValues: { name: data.name } })

  const onSubmit = async (dataForm) => {
    try {
      setDisableBtn(true)
      const dataUpdate = {
        name: dataForm.name
      }
      await UpdateCategoria(dataUpdate, data.id)
      setModal(false)
      setReload(true)
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error.message)
      } else {
        setError(error.message)
      }
    } finally {
      setDisableBtn(false)
    }
  }
  return (
    <BoxForm modedark={modedark}>
      <div className='avatar'><Logo big /></div>
      <h2>{preData.update}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='tipo' modedark={modedark}>
          Edite el nombre de la categoría
          <Input
            type='text' placeholder='Nombre de la categoría' id='name' name='name' {...register('name', {
              required: {
                value: true,
                message: 'Nombre de la categoría es requerido '
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
        {errors.name
          ? (
            <>
              {errors.name.type === 'required' && (
                <div className='errors' onClick={() => clearErrors('name')}>
                  {errors.name.message}
                </div>
              )}
              {errors.name.type === 'pattern' && (
                <div className='errors' onClick={() => clearErrors('name')}>
                  {errors.name.message}
                </div>
              )}
            </>
            )
          : null}

        <Button value={preData.buttonUpdate} disabled={disableBtn} loading={disableBtn} modedark={modedark} />

      </form>

    </BoxForm>
  )
}
