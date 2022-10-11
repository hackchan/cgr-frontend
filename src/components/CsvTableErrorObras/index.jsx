
import React, { useMemo, useState, useContext, useEffect } from 'react'
import { ColumnsTable } from './Columns'
import MaterialReactTable from 'material-react-table'
import { AppContext } from '../../contex/AppProvidercContext'
import { ContainerBox } from '../../styles/box'
import { Box, Tooltip, createTheme, ThemeProvider } from '@mui/material'
import { esES } from '@mui/material/locale'
export const MatrizObraError = ({ data, errorDetail }) => {
  const { state } = useContext(AppContext)
  const modedark = state.darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: modedark,
      primary: {
        main: '#81980f'
      },
      secondary: {
        main: '#00bcd4'
      }
    }
  }, esES)
  const columns = useMemo(() => ColumnsTable, [])
  const [tableData, setTableData] = useState(() => data)
  const [columnsWithError, setColumnsWithError] = useState([])

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    // if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    tableData[row.index] = values
    // send/receive api updates here
    setTableData([...tableData])
    exitEditingMode() // required to exit editing mode
  }

  useEffect(() => {
    const res = errorDetail.map((detail, idx) => {
      return idx + '_' + detail.path.split('.')[1]
    })
    setColumnsWithError(res)
    console.log('error detail:', res)
  }, [])

  return (
    <ContainerBox>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          muiTableBodyRowProps={({ row }) => ({
            sx: {
              backgroundColor: row.index % 2 === 0 ? 'rgba(52, 54, 245, 0.08)' : ''
            }
          })}
          muiTableBodyCellProps={({ cell }) => {
            return (
              {
                title: columnsWithError.includes(cell.id) ? 'lalala' : cell.getValue(),
                sx: {
                  border: 'none',
                  background: columnsWithError.includes(cell.id) ? '#ff22AA' : '',
                  fontWeight: columnsWithError.includes(cell.id) ? 'bold' : '',
                  fontSize: columnsWithError.includes(cell.id) ? '14px' : ''
                }
                // access the row data to determine if the checkbox should be disabled
              })
          }}
          columns={columns}
          data={tableData}
          muiTableHeadCellProps={{
            className: 'tableHeaderCell'
          }}
          muiTableContainerProps={{ className: 'tableContainer' }}
          muiTableHeadProps={{
            className: 'tableHeader'
          }}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableSorting={false}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          muiTableBodyRowProps={{ hover: true }}
          editingMode='row'
          enableEditing
          onEditingRowSave={handleSaveRow}
          initialState={{
            columnVisibility: { description: false },
            density: 'compact'
          }}

        />
      </ThemeProvider>

    </ContainerBox>

  )
}
