import styled from 'styled-components'
import { device } from '../../utils/devices'
import { NavLink } from '../NavLink'
export const StyledNavLink = styled(NavLink)`
  margin: 0 5px;
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
