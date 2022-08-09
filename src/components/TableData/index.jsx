/* eslint-disable react/jsx-key */
import React, { useMemo, useRef } from 'react'
import { Container, Table, Pagination, Button, PageNumber, PaginationButtons } from './styles'
import { useTable, useSortBy, useBlockLayout, useResizeColumns, usePagination } from 'react-table'

export const TableData = ({ columnJson, dataJson, styles }) => {
  const refContador = useRef()
  const data = useMemo(() => dataJson, [])
  const columns = useMemo(() => columnJson, [])
  const defaultColumn = useMemo(
    () => ({
      minWidth: 80,
      width: 200,
      maxWidth: 500
    }),
    []
  )
  const tableInstance = useTable({ columns, data, defaultColumn, initialState: { pageIndex: 0, pageSize: 50 } }, useBlockLayout, useResizeColumns, useSortBy, usePagination)

  const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize, state, footerGroups, prepareRow, resetResizing } = tableInstance
  const { pageIndex, pageSize } = state

  return (
    <Container>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? 'isResizing' : ''
                    }`}
                  />
                </th>
              ))}
            </tr>
          ))}

        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td styles={{ 'text-align': 'center', display: 'flex', 'justify-content': 'center', 'align-items': 'center' }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>

        {/* <tfoot>
        {
          footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))
}
      </tfoot> */}
      </Table>
      {dataJson.length > 1 && (<Pagination>
        <span />
        <PaginationButtons>
          <Button onClick={() => { refContador.current.value = 1; gotoPage(0) }} disabled={!canPreviousPage}>Inicio</Button>
          <Button onClick={() => { refContador.current.value = Number(refContador.current.value) - 1; previousPage() }} disabled={!canPreviousPage}>Anterior</Button>
          <PageNumber>
            <span className='pagina'> Pagina </span>
            <span>
              <input
                type='number' defaultValue={pageIndex + 1} onChange={e => {
                  const pageNumber = e.target.value ? Number(e.target.value) - 1 : pageCount - 1
                  if (e.target.value > pageCount) {
                    e.target.value = pageCount
                    gotoPage(pageCount - 1)
                  } else if (e.target.value && Number(e.target.value) === 0) {
                    gotoPage(0)
                    e.target.value = 1
                  } else { gotoPage(pageNumber) }
                }}
                min='1'
                max={pageCount}
                step='1'
                ref={refContador}
              />
            </span>
            <span className='pagina'>de {pageOptions.length}</span>
          </PageNumber>

          <Button onClick={() => { refContador.current.value = Number(refContador.current.value) + 1; nextPage() }} disabled={!canNextPage}>Proximo</Button>
          <Button onClick={() => { refContador.current.value = pageOptions.length; gotoPage(pageCount - 1) }} disabled={!canNextPage}>Ultima</Button>
        </PaginationButtons>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[50, 100, 200, 500].map((pageSize) => (
            <option key={pageSize} value={pageSize}> {pageSize}</option>
          ))}
        </select>
      </Pagination>)}

    </Container>

  )
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>ID</th>
  //         <th>NAME</th>
  //         <th>TEL</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td>
  //           1981
  //         </td>
  //         <td>
  //           FABIO ROJAS
  //         </td>
  //         <td>
  //           3183895020
  //         </td>
  //       </tr>
  //     </tbody>
  //   </table>
  // )
}
