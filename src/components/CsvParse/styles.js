import styled, { css } from 'styled-components'
import { AiFillCloseCircle } from 'react-icons/ai'
export const DragArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width:800px;
  transform: translate(-50%, -50%);
  & h4 {
    position: absolute;
    color: white;
    z-index: -999;
    ${(props) =>
      props.file &&
      css`
         {
          visibility: hidden;
        }
      `}
  }
`

export const WrapFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 300px;
  border: 2px dashed #d0d7de;
  border-radius: 15px;
 
  ${(props) =>
    props.file &&
    css`
       {
        background: rgba(255,255,255,.3);
      }
    `}

  &:hover {
    
    border: 2px dashed hotpink;
  }
`
export const InputFile = styled.input`
  position: absolute;
  outline: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
`

export const FileLoaded = styled.div`
  color: white;
  background: rgba(2, 2, 2, .8);
  min-width: 150px;
  border-radius: 5px;
  position: absolute;
  padding: 30px 15px;
  display: none;
  text-align: center;
    ${(props) =>
      props.file &&
      css`
         {
          display: block;
        }
      `};
`

export const IcoClose = styled(AiFillCloseCircle)`
  color: red;
  font-size:20px;
  border-radius:50%;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index:10;
  cursor: pointer;
`

export const WrapTable = styled.div`
  max-width: 1000px;
  height: 500px;
  overflow: auto;
  margin: 0 auto;
  z-index: 999;
  vertical-align: middle ;
`
