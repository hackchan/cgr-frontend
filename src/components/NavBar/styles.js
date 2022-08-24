import styled, { css } from 'styled-components'
import { device } from '../../utils/devices'
import { NavLink } from '../NavLink'
export const StyledNavLink = styled(NavLink)`
  height: inherit;
  &:hover {
    color: yellow;
  }
  &.is-active {
    font-weight: bold;
    pointer-events: none;
    color: #94c53c;
  }
  /* @media ${device.tablet} {
    display: block;
    padding: 20px 0;
    border: initial;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    &:hover {
      border-top: initial;
      color: yellow;
    }
    &.is-active {
      border-top: initial;
      color: #94c53c;
    }
    height: 60px;
  } */
`
export const LogoName = styled.p`
  color: black;
  font-weight: bold;
  font-size: 20px;
  &:hover {
    & ~ span {
      transition: 0.4s;
      transform: rotate(720deg) scale(1.1);
    }
  }
  ${(props) =>
    props.darkMode &&
    css`
       {
        color:white
      }
    `}
`
export const LogoApp = styled.span`
  color: #94c53c;
  font-weight: bold;
  font-size: 20px;
  transition: .3s;

`
