import styled, { css } from 'styled-components'
import { NavLink } from '../NavLink'
import { device } from '../../utils/devices'
import { ImMenu } from 'react-icons/im'

export const MenuBurger = styled(ImMenu)`
  color: white;
  font-size: 25px;
  display: none;
  @media ${device.tablet} {
    display: block;
   
  }
`

export const Nav = styled.nav`
  overflow-y: hidden;
`

export const MenuContent = styled.ul`
  list-style: none;
  display: flex;
  height: 60px;
  max-width: 800px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.tablet} {
    
    font-size: 20px;
    background: rgba(2, 2, 2, 0.8);
    display: block;
    position: absolute;
    left: -300px;
    top: 60px;
    z-index: 1;
    height: 100%;
   
    ${(props) =>
      props.burger &&
      css`
         {
          left: 0;
          right: 0;
        }
      `}
  }
    `
export const MenuList = styled.li`
  height: 60px
  
`

// export const MenuListLink = styled.a`
//   display: flex;
//   justify-content: space-around;
//   margin: 0 5px;
//   height: inherit;
//   border: 3px solid transparent;
// `
export const StyledNavLink = styled(NavLink)`
  margin: 0 5px;
  height: inherit;
  border: 3px solid transparent;
  &:hover {
    border-top: 3px solid yellow;
  }
  &.is-active {
    font-weight: bold;
    pointer-events: none;
    border-top: 3px solid #94c53c;
  }
  @media ${device.tablet} {
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
  }
`
