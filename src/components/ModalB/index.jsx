import React from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Logo } from '../Logo'
import '../../styles/modal.css'
export const ModalB = ({ closeModal, children, ...props }) => {
  return (
    <Modal {...props} className='special_modal' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter' className='d-flex p-2 justify-content-center align-items-center'>
          <Logo />
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {children}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}
