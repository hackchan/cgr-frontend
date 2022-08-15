import React, { useContext, useState } from 'react'
import { Logo } from '../Logo'
import { AppContext } from '../../contex/AppProvidercContext'
import { BoxForm, Title, Message } from './styles'
import { clearMessage } from '../../utils/time'
import { ButtonLoading } from '../ButtonLoading'
export const Delete = ({ data, closeModal, preData, setReload }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const { DeleteDepartment } = useContext(AppContext)

  const handleDelete = async () => {
    try {
      setDisableBtn(true)
      await DeleteDepartment(data)
      closeModal(false)
      setReload(true)
    } catch (error) {
      if (error.response.data) {
        console.log('ENTRO AQUI ERROR:', error.response.data.error.message)
        setError(error.response.data.error.message)
      } else {
        console.log('ENTRO AQUI ERROR2:', error.message)
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

      <ButtonLoading onClick={() => closeModal(false)} value='cancelar' />
      <ButtonLoading onClick={() => handleDelete()} className='danger' disabled={disableBtn} loading={disableBtn} value='Eliminar' />

      <div>
        {error && <p><span className='errors'>{error}</span></p>}
      </div>
    </BoxForm>
  )
}
