import React from 'react'
import { Button, IconLoading } from './styles'

export const ButtonLoading = ({ value, onClick, loading, modedark, ...props }) => {
  const handleClick = async () => {
    if (onClick) { await onClick() }
  }
  return (
    <Button {...props} modedark onClick={handleClick}>
      {value}
      {loading && (<IconLoading />)}
    </Button>
  )
}
