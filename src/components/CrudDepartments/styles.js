import styled from 'styled-components'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Clear, Edit, Delete } from '@mui/icons-material'
export const ContainerBox = styled.div`

  background: rgba(2, 2, 2, 0.7);
  font-size: 14px;
  margin: 22px 0;
  border-radius: 5px;
  box-shadow: 0px 3px 8px 2px rgba(255, 255, 255, 0.3);
  text-align: center;
  max-height: 750px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const ButtonAdd = styled.button`
  background: #94c53c;
  padding: 0px 20px;
  text-transform: uppercase;
  border-radius: 5px;
  margin: 0px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    box-shadow: inset 0px -35px 2px rgba(2, 2, 2, 0.1);
  }
  &:active {
    transform: scale(0.9);
  }
  &:disabled {
    background: gray;
    pointer-events: none;
  }
  &.danger {
    background: red;
  }
  &::before{
    
  }
`
export const BoxForm = styled.div`
  background-color: rgba(0, 0, 0, .5);
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 50px 30px;
  border-radius: 10px;
  & h2 {
    color: white;
    margin-bottom: 20px;
  }
`

export const LabelBox = styled.label`
  display: block;
  color: #94c53c;
  text-align: left;
  margin-top: 5px;
`

export const InputText = styled.input`
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
export const Title = styled.h2`
  margin: 0 !important;
  /* color: red !important; */
  margin-bottom: 2px !important;
`
export const Message = styled.p`
  margin-bottom: 30px;
  color: #94c53c;
`
export const IconLoading = styled(AiOutlineLoading3Quarters)`
  color: red;
  font-size: 1rem;
  animation: animate 2s infinite;
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
`
export const DeleteIconStyle = styled(Delete)`
   font-size: 18px !important;
   color: red;
   cursor: pointer;
   &:hover{
    color: red
   }
`
export const EditIconStyle = styled(Edit)`
  font-size: 18px !important;
  color: gray;
  cursor: pointer;
  &:hover {
    color: #89b637;
  }
`
