import styled from 'styled-components'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export const ContainerBox = styled.div`
 background: rgba(2,2,2,.7);
 font-size: 14px;
 border-radius: 5px;
 box-shadow: 0px 3px 8px 2px rgba(255,255,255,.3);
 text-align: center;
 max-height: 85vh;
 overflow: auto;
`

export const ButtonAdd = styled.button`
  background: #94c53c;
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 5px;
  margin: 5px;
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

export const InputEmail = styled.input`
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
