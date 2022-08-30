import styled from 'styled-components'
import { FaWindowClose } from 'react-icons/fa'

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.9);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 99999;
`

export const ModalDetail = styled.div`
  
  border-radius: 12px;
  box-shadow: 0px 2px 2px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 999;
`
// export const ModalCloseBtn = styled.button`
//   width:30px;
//   height: 30px;
//   border-radius: 50%;
//   position: absolute;
//   right: 10px;
//   top:10px;
//   background: rgba(255, 14, 25, 1);
//   text-transform: uppercase;
//   color: white;
//   cursor: pointer;
//   font-weight: bold;
//   transition: 0.3s;
//   &:hover {
//     box-shadow: inset 0px -35px 2px rgba(2, 2, 2, 0.1);
//   }
//   &:active {
//     transform: scale(0.9);
//   }
// `

export const ModalCloseBtn = styled(FaWindowClose)`
  color: rgba(255, 14, 25, 1);
  border-radius: 10px;
  font-size: 25px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:active {
    transform: scale(0.9);
  }
  z-index: 99999;
`
