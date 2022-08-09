import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contex/AppProvidercContext'
import { TableData } from '../TableData'
import { Spinner } from '../Spinner'
export const SatelitalData = () => {
  const { getSatelitales } = useContext(AppContext)
  const [tableColumns, setTableColumns] = useState([])
  const [sat, setSat] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const columns = [{ Header: 'Id', accessor: 'id' },
    { Header: 'Name', accessor: 'name' }]
  const data = [{ id: 1, name: 'SATELITAL ORIENTE' }, { id: 2, name: 'SATELITAL PACIFICO' }]
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getSatelitales()
        const headersTable = Object.keys(data[0])
        const col = headersTable.map((column) => {
          return { Header: column, accessor: column }
        })

        console.log(headersTable)
        setTableColumns(col)
        setSat(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='box'>
      {loading && <Spinner />}
      {sat.length > 0 && <TableData
        columnJson={tableColumns} dataJson={sat} style={{ background: 'red' }}
        defaultPageSize={50}
                         />}

    </div>
  )
}
