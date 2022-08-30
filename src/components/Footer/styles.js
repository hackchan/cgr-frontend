import styled from 'styled-components'

export const StickyFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(126, 17, 133);
  background: linear-gradient(90deg, #212529, #212529 25%, #212529);
  color: white;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  box-shadow: -2px -2px 6px 0.5px rgba(white, 0.2);
  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 14px;
    justify-content: center;
  }
`
