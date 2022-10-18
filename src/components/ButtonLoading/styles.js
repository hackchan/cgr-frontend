import styled, { css } from 'styled-components'
import { BiLoaderCircle } from 'react-icons/bi'
import { theme } from '../../styles/theme'
export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${theme.light.colors.buttonWin};
  padding: 10px 30px;
  text-transform: uppercase;
  border-radius: 5px;
  margin-right: 5px;
  margin-top: 15px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  ${(props) =>
    props.modedark &&
    css`
       {
        background: ${theme.dark.colors.buttonWin};
      }
    `};
  &:hover {
    box-shadow: inset 0px -35px 2px rgba(2, 2, 2, 0.1);
  }
  &:active {
    transform: scale(1);
    box-shadow: inset 0px -35px 2px rgba(255, 255, 255, 0.1);
  }
  &:disabled {
    background: gray;
    pointer-events: none;
  }
  &.danger {
    background: red;
  }
`
export const IconLoading = styled(BiLoaderCircle)`
  color: white;
  font-size: 1rem;
  animation: animate 2s infinite;
  margin-left: 2px;
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
`
