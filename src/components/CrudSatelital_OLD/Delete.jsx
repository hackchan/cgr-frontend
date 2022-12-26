import React, { useContext, useState } from 'react'
import { Logo } from '../Logo'
import { AppContext } from '../../contex/AppProvidercContext'
import { BoxForm, Title, Message } from './styles'
import { clearMessage } from '../../utils/time'
import { ButtonLoading } from '../ButtonLoading'
export const Delete = ({ data, closeModal, preData, setReload }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const { DeleteSatelital } = useContext(AppContext)

  const handleDelete = async () => {
    try {
      setDisableBtn(true)
      await DeleteSatelital(data)
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
    <BoxForm>
      <div className='avatar'>
        <Logo big />
      </div>
      <Title>Eliminar {preData.title}</Title>
      <Message>Esta seguro que desea Eliminar la {preData.title} {data.name}?</Message>

      <ButtonLoading onClick={() => closeModal(false)} className='danger' value='cancelar' />
      <ButtonLoading onClick={() => handleDelete()} disabled={disableBtn} loading={disableBtn} value='Aceptar' />

      <div>
        {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
      </div>
    </BoxForm>
  )
}
