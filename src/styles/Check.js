import styled, { css } from 'styled-components'
import FormCheck from 'react-bootstrap/FormCheck'
import { theme } from './theme'
export const FormCheckStyle = styled(FormCheck)`
  display: inline-flex;
  /* filter: invert(100%) hue-rotate(18deg) brightness(1.7); */
  .form-check-input {
    color: red;
    transform: scale(1.2);
  }
  .form-check-input:checked {
    border-color: #89b637 !important;
    background-color: #89b637 !important;
  }
  .form-check-input:focus {
    /* border-color: violet !important;
    box-shadow: 0 0 0 0rem rgba(0, 0, 0, 0) !important; */
  }

  .form-check-label {
    color: ${theme.light.colors.labelWin} !important;
    margin-left: 10px;
    /* color: hotpink; */
  }
  ${(props) =>
    props.modedark === 'true' &&
    css`
       {
        .form-check-label {
          color: ${theme.dark.colors.labelWin} !important;
        }
      }
    `}
`
export const ContainerSwitch = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`
