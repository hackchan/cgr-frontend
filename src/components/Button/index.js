import React from 'react'
import { ButtonSubmit, ButtonWrapper } from './styles'
import { Loading } from '../Loading'
export const Button = ({ value, onClick, ...props }) => {
  return (
    <ButtonWrapper>
      <Loading {...props} />
      <ButtonSubmit {...props} type='submit' value={value} onClick={onClick} />
    </ButtonWrapper>
  )
}
