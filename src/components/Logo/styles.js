import styled, { css } from 'styled-components'

export const LogoCGR = styled.div`
  display: block;
  margin-right:8px;
  position: relative;
  width: 32px;
  height: 32px;
  border: solid 4px #273b89;
  border-left: solid 4px #ffce25;
  border-top: solid 4px #ffce25;
  border-radius: 50%;
  transform: rotate(-45deg);
  
  ${(props) =>
    props.big &&
    css`
       {
        width: 64px;
        height: 64px;
        border: solid 8px #273b89;
        border-left: solid 8px #ffce25;
        border-top: solid 8px #ffce25;
      }
    `}
`

export const RedPoint = styled.div`
  width: 16px;
  height: 16px;
  background: red;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) =>
    props.big &&
    css`
       {
        width: 32px;
        height: 32px;
      }
    `}
`
