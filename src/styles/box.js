import styled, { css } from 'styled-components'
import { tableHeight } from '../styles/animation'
import { theme } from './theme'
import FormLabel from 'react-bootstrap/FormLabel'
export const ContainerBox = styled.div`
  background: rgba(2, 2, 2, 1);
  font-size: 14px;
  border-radius: 0px;
  padding: 5px;
  box-shadow: 0px 3px 5px rgba(25, 25, 25, 0.2);
  text-align: center;
  min-height: 90%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`
export const BoxForm = styled.div`
  background: ${theme.light.colors.fondoWin};
  width: 100%;
  height: 100%;

  padding: 50px 30px;
  border-radius: 10px;
  & h2 {
    color: ${theme.light.colors.titleWin};
    margin-bottom: 20px;
    font-size: 22px;
    text-transform: uppercase;
  }
  ${(props) =>
    props.modedark &&
    css`
       {
        background: ${theme.dark.colors.fondoWin};
        & h2 {
          color: ${theme.dark.colors.titleWin};
          text-transform: uppercase;
          font-weight: bold;
        }
      }
    `};
  &.size {
    min-width: 600px;
  }
`
export const LabelBox = styled.label`
  display: block;
  color: ${theme.light.colors.labelWin};
  text-align: left;
  margin-top: 5px;
  ${(props) =>
    props.modedark &&
    css`
       {
        color: ${theme.dark.colors.labelWin};
      }
    `}
`

export const FormLabelStyle = styled(FormLabel)`
  display: block;
  color: ${theme.light.colors.labelWin};
  text-align: left;
  margin-top: 5px;
  ${(props) =>
    props.modedark === 'true' &&
    css`
       {
        color: ${theme.dark.colors.labelWin};
      }
    `}
`
export const Title = styled.h2`
  margin: 0 !important;
  /* color: red !important; */
  margin-bottom: 2px !important;
`
export const Message = styled.p`
  margin-bottom: 30px;
  color: #94c53c;
`
export const Input = styled.input`
  width: 100%;
  margin-bottom: 5px;
  margin-top: 10px;
  /* border: none; */
  /* border-bottom: 1px solid #fff; */
  /* background: transparent; */
  /* outline: none; */
  height: 40px;
  /* color: #fff; */
  font-size: 16px;
`
export const TableStyled = css`
  ${tableHeight()}
`
