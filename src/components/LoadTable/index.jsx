import React from 'react'
import { TableData } from '../TableData'
import { WrapTable, MatrixBox, Back } from './styles'
import { useLocation, Link } from 'react-router-dom'
export const LoadTable = () => {
  const location = useLocation()
  console.log(location)
  return (
    <MatrixBox>
      <h2>Matrix de hitos</h2>
      <Back to='/estructuracion'> 👈 </Back>
      <WrapTable>
        <TableData
          columnJson={location.state.header} dataJson={location.state.data} style={{ background: 'red' }}
          defaultPageSize={50}
        />
      </WrapTable>
    </MatrixBox>

  )
}
