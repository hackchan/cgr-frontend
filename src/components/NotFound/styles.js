import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const ButtonCircle = styled.button`
  background: red;
  width:40px;
  height: 40px;
  color: white;
  border-radius: 50%;
  text-transform: uppercase;
  border: 3px solid #222;
  margin-bottom: 20px;
  cursor: pointer;
  transition:.3s;
  box-shadow: 2px 2px 5px rgba(255,255,255,.5);
  &:active {
    border: 2px solid transparent;
    transform: scale(.8);
  }
`
export const Dark = styled.div`

  padding: 10px;
  visibility: visible;
  height: 100vh;
  background-color: #000c2f;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  ${(props) =>
    props.light &&
    css`
       {
        background: #e9fe6f;
      }
    `}
`

export const ImageWrapper = styled.div`
  display: block;
  overflow: hidden;
  position: relative;
  min-height: 300px;
  width: 100%;

  & p {
    line-height: 24px;
    font-weight: 300;
    color: #1b334d;
    margin: 30px 0;
   
  }
`

export const Img = styled.img`
   box-shadow: 0 10px 14px rgba(0,0,0 ,.2);
   height: 100%;
   object-fit: contain;
   position: absolute;
   top: 0;
   bottom:0;
   width:100%;
   z-index:1;
`

export const Message = styled.div`
  margin: 15px 0;
  & p {
    text-align: center;
    font-size: 20px;
    margin: 0;
    padding: 0;
    @media (max-width: 400px) {
      font-size: 14px;
    }
  }
`

export const LinkBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  margin: 20px auto;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  border: 0px solid;
  border-bottom: 2px solid;
  border-color: #ec9228;
  padding: 10px 41px;
  border-radius: 5px;
  background: none;
  text-transform: uppercase;
  background-color: #ffad32;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: #ec9228;
    color: #ffffff;
    text-decoration: none;
  }
  &.btn-brown {
    border-color: #ec5900;
    background-color: #ff7000;
    &.btn-brown:hover {
      background: #ec5900;
    }
  }
`
