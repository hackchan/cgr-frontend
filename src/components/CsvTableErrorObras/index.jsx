
import React, { useMemo, useState, useContext, useEffect } from 'react'
import MaterialReactTable from 'material-react-table'
import { AppContext } from '../../contex/AppProvidercContext'
import { ContainerBox } from '../../styles/box'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { esES } from '@mui/material/locale'
import { ButtonStyled } from '../../styles/button'
import { obrasSchema } from './Schema'
// import { object, string, number, array, date } from 'yup'
import { ColumnsTable } from './Columns'

export const MatrizObraError = ({ data }) => {
  const [tableData, setTableData] = useState(() => data)
  const [columnsWithError, setColumnsWithError] = useState([])
  const [messagesError, setmessagesError] = useState({})
  const [errorDetail, setErrorDetail] = useState([])
  const [error, setError] = useState('')
  const [upload, setUpload] = useState(true)
  const [totalError, setTotalError] = useState(0)
  const [progress, setProgress] = useState(false)

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

  const columnsData = useMemo(() => ColumnsTable, [])

  const handleUploadData = (rows) => {
    console.log(tableData)
  }
  const handleValidateData = () => {
    try {
      setTotalError(0)
      setError('')
      setProgress(true)
      setErrorDetail([])
      obrasSchema.validateSync(tableData, { abortEarly: false })
      setUpload(false)
    } catch (error) {
      setUpload(true)
      setErrorDetail(error.inner)
      setTotalError(error.inner.length)
      if (error.response) {
        setError(error.response.data.error.message)
      } else {
        setError(error.message)
      }
    } finally {
      setProgress(false)
    }
  }

  const handleSaveCell = (cell, value) => {
    setProgress(true)
    setUpload(true)
    if (cell.column.id === 'municipioObra' || cell.column.id === 'entidad' || cell.column.id === 'estado' || cell.column.id === 'origen' || cell.column.id === 'sector' || cell.column.id === 'anioCorte' || cell.column.id === 'mesCorte' || cell.column.id === 'diaCorte' || cell.column.id === 'cantidadAdiciones' || cell.column.id === 'tiempoProrrogas' || cell.column.id === 'tiempoSuspenciones' || cell.column.id === 'cantidadProrrogas' || cell.column.id === 'cantidadSuspenciones') {
      if (!isNaN(parseInt(value))) {
        value = parseInt(value)
      }
    } else if (cell.column.id === 'valorContratoInicial' || cell.column.id === 'valorContratoFinal' || cell.column.id === 'avanceFisicoProgramado' || cell.column.id === 'avanceFisicoEjecutado' || cell.column.id === 'avanceFinancieroEjecutado' || cell.column.id === 'valorTotalAdiciones' || cell.column.id === 'valorComprometido' || cell.column.id === 'valorObligado' || cell.column.id === 'valorPagado' || cell.column.id === 'valorAnticipo') {
      if (!isNaN(parseFloat(value))) {
        value = parseFloat(value)
      }
    }
    setTimeout(() => {
      tableData[cell.row.index][cell.column.id] = value
      setTableData([...tableData])
      setProgress(false)
      handleValidateData()
    }, 200)
  }

  useEffect(() => {
    const relationError = {}
    const res = errorDetail.map((detail, idx) => {
      relationError[detail.path.split('.')[0].charAt(1) + '_' + detail.path.split('.')[1]] = detail.message
      return detail.path.split('.')[0].charAt(1) + '_' + detail.path.split('.')[1]
    })
    setColumnsWithError(res)
    setmessagesError(relationError)
  }, [errorDetail, tableData])

  return (
    <ContainerBox>
      <ThemeProvider theme={theme}>
        {error && <p><span className='errors'>{`total de errores ${totalError}`}</span></p>}
        <MaterialReactTable
          muiTableBodyRowProps={({ row }) => ({
            hover: true,
            sx: {
              backgroundColor: row.index % 2 === 0 ? 'rgba(52, 54, 245, 0.08)' : ''
            }
          })}
          muiTableBodyCellProps={({ cell }) => {
            return (
              {
                title: columnsWithError.includes(cell.id) ? messagesError[cell.id] : '',
                sx: {
                  border: 'none',
                  background: columnsWithError.includes(cell.id) ? '#ff22AA' : '',
                  fontWeight: columnsWithError.includes(cell.id) ? 'bold' : '',
                  fontSize: columnsWithError.includes(cell.id) ? '14px' : ''
                }
                // access the row data to determine if the checkbox should be disabled
              })
          }}
          columns={columnsData}
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
          enableBottomToolbar
          enableTopToolbar
          editingMode='cell'
          enableEditing
          muiTableBodyCellEditTextFieldProps={({ cell }) => ({
            onBlur: (event) => {
              handleSaveCell(cell, event.target.value)
            }
          })}
          // onEditingRowSave={handleSaveRow}
          initialState={{
            columnVisibility: { description: false },
            density: 'compact'
          }}
          state={{
            showProgressBars: progress
          }}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Box
                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
              >
                <ButtonStyled
                  className='export'
                  onClick={() => { handleValidateData() }}
                  // startIcon={<FileDownloadIcon />}
                  variant='contained'
                >
                  Validar Data
                </ButtonStyled>

                <ButtonStyled
                  disabled={upload}
                  className='csv'
                  onClick={() => { handleUploadData(table.getPrePaginationRowModel().rows) }}
                  // startIcon={<FileDownloadIcon />}
                  variant='contained'
                >
                  Subir datos
                </ButtonStyled>

              </Box>
            )
          }}
        />
      </ThemeProvider>

    </ContainerBox>

  )
}
