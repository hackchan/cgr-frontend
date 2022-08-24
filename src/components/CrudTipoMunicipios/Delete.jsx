import React, { useState } from 'react'
import { Logo } from '../Logo'
import { clearMessage } from '../../utils/time'
import { ButtonLoading } from '../ButtonLoading'
import { BoxForm, LabelBox } from '../../styles/box'
export const Delete = ({ data, closeModal, preData, setReload, DeleteTipoMunicipios, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    try {
      setDisableBtn(true)
      await DeleteTipoMunicipios(data)
      closeModal(false)
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
      <div className='avatar'>
        <Logo big />
      </div>
      <h2>Eliminar {preData.title}</h2>
      <LabelBox modedark={modedark}>Esta seguro que desea Eliminar tipo {preData.title} {data.name}?</LabelBox>

      <ButtonLoading onClick={() => closeModal(false)} value='cancelar' />
      <ButtonLoading onClick={() => handleDelete()} className='danger' disabled={disableBtn} loading={disableBtn} value='Eliminar' />

      <div>
        {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
      </div>
    </BoxForm>
  )
}
