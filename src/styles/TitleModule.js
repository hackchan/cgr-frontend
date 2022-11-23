import styled from 'styled-components'

export const TitleModule = styled.h4`
  color: white;
  text-align: center;
  font-size: 18px;
  &::before {
    transition: 0.3s;
    font-size: 18px;
    content: '👇';
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
