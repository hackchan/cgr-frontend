import React from 'react'
import { Button, IconLoading } from './styles'

export const ButtonLoading = ({ value, onClick, loading, ...props }) => {
  const handleClick = async () => {
    await onClick()
  }
  return (
    <Button {...props} onClick={handleClick}>
      {value}
      {loading && (<IconLoading />)}
    </Button>
  )
}
