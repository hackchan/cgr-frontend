import React from 'react'
import { ModalContainer, ModalDetail, ModalCloseBtn } from './styles'
export const Modal = ({ closeModal, children }) => {
  return (
    <ModalContainer>
      <ModalDetail>
        <ModalCloseBtn onClick={() => { closeModal(false) }} />
        {children}
      </ModalDetail>
    </ModalContainer>
  )
}
