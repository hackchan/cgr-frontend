import styled from 'styled-components'

export const ButtonSubmit = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  height: 40px;
  background: #94c53c;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  color: #fff;
  font-size: 18px;
  border-radius: 15px;
  box-shadow: inset 0px -5px 0px rgba(4, 4, 4, 0.1);
  transition: all 0.3s;
  margin-top: 15px;

  &.btnoff {
    font-weight: bold;
    pointer-events: none;
    border-top: 3px solid gray;
    background: gray;
  }
  &:hover {
    cursor: pointer;
    background: #94c500;
  }
  &:active {
    box-shadow: none;
    transform: scale(0.8);
  }
`

export const ButtonWrapper = styled.div`
  position: relative;
  width: 250px;
`
