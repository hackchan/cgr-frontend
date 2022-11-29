import { Button } from '@mui/material'
import styled from 'styled-components'

export const ButtonStyled = styled(Button)`
  &.new {
    background: #9147ff !important;
  }
  &.export {
    background: #94c53c !important;
  }
  &.csv {
    background: #f2791d !important;
  }
  &.inactive {
    background: gray !important;
  }
`
