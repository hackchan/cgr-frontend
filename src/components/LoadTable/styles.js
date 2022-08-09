import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const MatrixBox = styled.div`
  background: rgba(2,2,2,.8);
  border-radius: 10px;
  padding: 10px;
  color: white;
  margin:30px 0;
  position: relative;
  & h2{
    text-align: center;
    margin-bottom:10px;
    color: hotpink;
  }
`

export const WrapTable = styled.div`
  
  background: white;
  max-width: 1000px;
  height: 600px;
  overflow: scroll;
  margin: 0 auto;
`

export const Back = styled(Link)`
  color: white;
  display: flex;
  padding: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: absolute;
  top:5px;
  font-size: 20px;
`
