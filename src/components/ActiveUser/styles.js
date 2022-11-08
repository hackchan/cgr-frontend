import styled from 'styled-components'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

export const PassBox = styled.div`
  position: relative;
  margin-bottom:10px;
`
export const EyeInvisible = styled(AiFillEyeInvisible)`
  
  font-size: 25px;
  color: rgba(0,176,206,.8);
  cursor: pointer;
`

export const EyeVisible = styled(AiFillEye)`
  
  font-size: 25px;
  color: white;
  cursor: pointer;
`

export const InputPass = styled.input`
  width: 100%;
  margin-bottom: 5px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  height: 40px;
  color: #fff;
  font-size: 16px;
`
