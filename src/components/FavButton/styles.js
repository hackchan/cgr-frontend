import styled from 'styled-components'
import { fadeIn } from '../../styles/animation'
import { MdFavorite } from 'react-icons/md'

export const LikeIcon = styled(MdFavorite)`
  color: #ff277a;
  ${fadeIn({ time: '250ms', type: 'ease-in' })}
`
export const Button = styled.button`
  color: white;
  display: flex;
  position: absolute;
  background: rgba(2,2,2,.5);
  top:0;
  right: 0;
  left:0;
  align-items: center;
  padding-top: 8px;
  outline: none;
  border: none;
  justify-content: center;
  & svg {
    margin-right: 4px;
  }
`
