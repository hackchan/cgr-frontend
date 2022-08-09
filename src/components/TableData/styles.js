
import styled from 'styled-components'

export const Table = styled.table`
  font-size: 12px;
  width:100%;
  height: 100%;
  vertical-align: middle;
  background: white;
  color: rgba(2, 2, 2, 0.8);
  border-spacing: 0;
  position: relative;
  box-shadow: 0px 0px 8px 2px rgba(255, 255, 255, 0.3);
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  & tr:hover {
    background: rgba(200, 200, 200, 0.5);
  }

  & tr:nth-child(even) {
    background: rgba(190, 190, 190, 0.2);
  }

  & tr:nth-child(even):hover {
    background: rgba(200, 200, 200, 0.5);
  }

  /* th,
  td {
    border-bottom: 1px solid rgba(2, 2, 2, 0.3);
    border-right: 1px solid rgba(2, 2, 2, 0.9);

    :last-child {
      border-right: 0;
    }
  } */

  th {
    background: rgba(2, 2, 2, 0.8);
    border-bottom: 3px solid rgba(2, 2, 2, 0.2);
    color: white;
    font-weight: bold;
    padding: 5px;
  }

  td {
    text-align: center;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  tfoot td {
    padding: 5px;
    text-align: center;
    background: rgba(255, 105, 180, 0.8);
    color: white;
    border-top: 3px solid rgba(2, 2, 2, 0.2);
  }
`
export const Container = styled.div`
`
export const Pagination = styled.div`
  color: white;
  background: black;
  position: absolute;
  bottom: 0px;
  left: 5px;
  right: 0;
  border-radius: 5px;
  padding: 2px 15px;
  display: flex;
  justify-content: space-between;
  & span.pagina{
    font-size:10px;
    color:white
  }
  /* position: fixed;
  top: 0; */
`
export const PageNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  & input{
    margin:0 5px;
    width: 60px;
    height: 30px;
    background: rgba(90,90,112,.5);
    color: hotpink;
    outline: none;
    border: none;
    font-weight: bold;
    font-size: 10px;
    text-align: center;
  }
  /* position: fixed;
  top: 0; */
`
export const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
`

export const Button = styled.button`
  font-size: 12px;
  color: rgba(255, 105, 180, 0.8);
  font-weight: bold;
  margin: 0 0px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: inset 0 -3px 2px rgba(2, 2, 2, 0.2);
  margin-right: 5px;
  margin-left: 5px;
  /* position: fixed;
  top: 0; */
  &:disabled,
  &[disabled] {
    color: #666666;
  }
`
