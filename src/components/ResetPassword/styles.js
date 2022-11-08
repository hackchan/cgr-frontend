import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const Box = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  max-width: 600px;
  padding: 50px 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: white;
  margin-bottom:10px;
`
export const ReturnButton = styled(Link)`
  text-decoration: none;
  padding: 10px 15px;
  color: white;
  background: #451093;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  border-radius: 10px;
  color: white;
  box-shadow: inset 0 -5px 2px rgba(2, 2, 2, 0.3);
  transition: 0.3s;
  margin: 10px auto;
  &:active {
    box-shadow: inset 0 0 2px rgba(2, 2, 2, 0.3);
    transform: scale(0.9);
  }
  &:hover{
    color:white
  }
`
