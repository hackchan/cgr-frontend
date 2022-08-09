import styled from 'styled-components'

export const BoxFile = styled.div`
  background: white;
  margin: 5px 0;
  padding: 20px;
`
export const WrapFile = styled.div`
  position: relative;
  height: 200px;
  border: 8px solid rgba(255,255,255,.5);
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    background-color: transparent;
    border: 4px dashed #d0d7de;
  }
`
export const InputFile = styled.input`
  position: relative;
  outline: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
 
`

export const MessageFile = styled.div`
  position: absolute;
  top: 50%;
  left: calc(50% - 291px);
  & h3{
    color:black;
    font-size: 22px;
  }
`

export const ImageWrapper = styled.div`
 
  width:100px;
  height: 100px;
  border-radius:50%;
  margin:0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column-reverse;
  
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 10px;
  text-align: center;
`
