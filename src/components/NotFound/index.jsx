import React, { useState } from 'react'
import LightImage from '../../images/404-light.gif'
import DarkImage from '../../images/404-dark.png'
import { Dark, ImageWrapper, Img, Message, LinkBtn, ButtonCircle } from './styles'
// import { useLocation } from 'react-router-dom'
export const NotFound = () => {
  const [light, setLight] = useState(false)
  // const location = useLocation()
  const turnOnLigth = () => {
    setLight(!light)
  }
  return (

    <Dark light={light}>
      <ButtonCircle onClick={turnOnLigth}>{light ? 'off' : 'on'}</ButtonCircle>
      <ImageWrapper>
        <Img src={light ? LightImage : DarkImage} alt='404 error' />
      </ImageWrapper>
      {light && (
        <Message>
          <p>La página que está buscando fue movida, eliminada, </p>
          <p>renombrado o puede que nunca haya existido.</p>

          <LinkBtn to='/'> Regresar </LinkBtn>
        </Message>)}

    </Dark>

  )
}
