import React, { useState } from 'react'
import { Logo } from '../Logo'
import { BoxForm, LabelBox } from '../../styles/box'
import { ButtonLoading } from '../ButtonLoading'
export const Delete = ({ data, closeModal, preData, setReload, DeleteDepartment, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    try {
      setDisableBtn(true)
      await DeleteDepartment(data)
      closeModal(false)
      setReload(true)
    } catch (error) {
      if (error.response.data) {
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
      <h2>{preData.delete}</h2>
      <LabelBox modedark={modedark}>Esta seguro que desea Eliminar el {preData.table} {data.name}?</LabelBox>

      <ButtonLoading onClick={() => closeModal(false)} value='cancelar' />
      <ButtonLoading onClick={() => handleDelete()} className='danger' disabled={disableBtn} loading={disableBtn} value='Eliminar' />

      <div>
        {error && <p><span className='errors'>{error}</span></p>}
      </div>
    </BoxForm>
  )
}
