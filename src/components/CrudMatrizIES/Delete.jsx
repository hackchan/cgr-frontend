import React, { useState } from 'react'
import { Logo } from '../Logo'
import { BoxForm, Title, Message } from '../../styles/box'
import { ButtonLoading } from '../ButtonLoading'
export const Delete = ({ data, closeModal, preData, setReload, DeleteMatrizObra, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    try {
      setDisableBtn(true)
      await DeleteMatrizObra(data)
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
      <Title>{preData.delete}</Title>
      <Message>Esta seguro que desea Eliminar la {preData.table} del estudiante {data.codigo} del semestre {data.semestreReportado}?</Message>

      <ButtonLoading onClick={() => closeModal(false)} value='cancelar' />
      <ButtonLoading onClick={() => handleDelete()} className='danger' disabled={disableBtn} loading={disableBtn} value='Eliminar' />

      <div>
        {error && <p><span className='errors'>{error}</span></p>}
      </div>
    </BoxForm>
  )
}
