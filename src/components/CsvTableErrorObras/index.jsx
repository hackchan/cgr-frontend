
import React, { useMemo, useState, useContext, useEffect, useCallback } from 'react'
import { ColumnsTable } from './Columns'
import MaterialReactTable from 'material-react-table'
import { AppContext } from '../../contex/AppProvidercContext'
import { ContainerBox } from '../../styles/box'
import { Box, createTheme, ThemeProvider, MenuItem } from '@mui/material'
import { esES } from '@mui/material/locale'
import { ButtonStyled } from '../../styles/button'
import { object, string, number, array } from 'yup'

const validateRequired = (value) => !!value.length
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const validateAge = (age) => age >= 18 && age <= 50

export const MatrizObraError = ({ data }) => {
  const [tableData, setTableData] = useState(() => data)
  const [columnsWithError, setColumnsWithError] = useState([])
  const [messagesError, setmessagesError] = useState({})
  const [errorDetail, setErrorDetail] = useState([])
  const [error, setError] = useState('')
  const [upload, setUpload] = useState(true)
  const [validationErrors, setValidationErrors] = useState({})
  const [municipios, setMunicipios] = useState([])

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
                ? validateAge(+event.target.value)
                : validateRequired(event.target.value)
          if (!isValid) {
            // set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`
            })
          } else {
            // remove validation error for cell if valid
            delete validationErrors[cell.id]
            setValidationErrors({
              ...validationErrors
            })
          }
        }
      }
    },
    [validationErrors]
  )
  const { state, getMunicipios } = useContext(AppContext)
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
  const columns = useMemo(() => [
    {
      accessorKey: 'idBpin',
      header: 'idBpin'
    },
    {
      accessorKey: 'idContrato',
      header: 'idContrato'
    },

    {
      accessorKey: 'sector',
      header: 'sector'
    },

    {
      accessorKey: 'municipioObra',
      header: 'municipioObra',
      muiTableBodyCellEditTextFieldProps: {
        select: true, // change to select for a dropdown
        children: municipios.map((state) => {
          console.log(' E L  S T A T E:', state)
          return (
            <MenuItem key={state.name} value={state.name}>
              {state.name}
            </MenuItem>
          )
        })
      }
      // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //   // ...getCommonEditTextFieldProps(cell),
      //   type: 'select'
      // })
    },

    {
      accessorKey: 'nombreProyecto',
      header: 'nombreProyecto'
    },

    {
      accessorKey: 'objetoProyecto',
      header: 'objetoProyecto'
    },

    {
      accessorKey: 'unidadFuncional',
      header: 'unidadFuncional'
    },

    {
      accessorKey: 'fechaSuscripcion',
      header: 'fechaSuscripcion'
    },

    {
      accessorKey: 'fechaInicio',
      header: 'fechaInicio'
    },
    {
      accessorKey: 'fechaProgramadaTermina',
      header: 'fechaProgramadaTermina'
    },

    {
      accessorKey: 'fechaTermina',
      header: 'fechaTermina'
    },

    {
      accessorKey: 'valorContratoInicial',
      header: 'valorContratoInicial'
    },

    {
      accessorKey: 'valorContratoFinal',
      header: 'valorContratoFinal'
    },

    {
      accessorKey: 'avanceFisicoProgramado',
      header: 'avanceFisicoProgramado',
      size: 200
    },

    {
      accessorKey: 'avanceFisicoEjecutado',
      header: 'avanceFisicoEjecutado'
    },

    {
      accessorKey: 'avanceFinancieroEjecutado',
      header: 'avanceFinancieroEjecutado',
      size: 250
    },
    {
      accessorKey: 'nroContrato',
      header: 'nroContrato',
      size: 200
    },

    {
      accessorKey: 'cantidadSuspenciones',
      header: 'cantidadSuspenciones',
      size: 200
    },

    {
      accessorKey: 'cantidadProrrogas',
      header: 'cantidadProrrogas',
      size: 200
    },

    {
      accessorKey: 'tiempoSuspenciones',
      header: 'tiempoSuspenciones',
      size: 200
    },

    {
      accessorKey: 'tiempoProrrogas',
      header: 'tiempoProrrogas',
      size: 200
    },

    {
      accessorKey: 'cantidadAdiciones',
      header: 'cantidadAdiciones',
      size: 200
    },

    {
      accessorKey: 'valorTotalAdiciones',
      header: 'valorTotalAdiciones',
      size: 200
    },

    {
      accessorKey: 'origen',
      header: 'origen',
      size: 200
    },

    {
      accessorKey: 'valorComprometido',
      header: 'valorComprometido'
    },

    {
      accessorKey: 'valorObligado',
      header: 'valorObligado'
    },

    {
      accessorKey: 'valorPagado',
      header: 'valorPagado'
    },

    {
      accessorKey: 'valorAnticipo',
      header: 'valorAnticipo'
    },

    {
      accessorKey: 'estado',
      header: 'estado'
    },

    {
      accessorKey: 'razonSocialContratista',
      header: 'razonSocialContratista'
    },

    {
      accessorKey: 'idContratista',
      header: 'idContratista',
      size: 250
    },

    {
      accessorKey: 'razonSocialNuevoContratista',
      header: 'razonSocialNuevoContratista',
      size: 250
    },

    {
      accessorKey: 'idNuevoContratista',
      header: 'idNuevoContratista',
      size: 250
    },

    {
      accessorKey: 'observaciones',
      header: 'observaciones',
      size: 250
    },

    {
      accessorKey: 'linkSecop',
      header: 'linkSecop',
      size: 250
    },

    {
      accessorKey: 'nroContratoInterventoria',
      header: 'nroContratoInterventoria',
      size: 250
    },

    {
      accessorKey: 'nombreInterventoria',
      header: 'nombreInterventoria',
      size: 250
    },

    {
      accessorKey: 'idInterventoria',
      header: 'idInterventoria',
      size: 250
    },

    {
      accessorKey: 'diaCorte',
      header: 'diaCorte'
    },

    {
      accessorKey: 'mesCorte',
      header: 'mesCorte'
    },

    {
      accessorKey: 'anioCorte',
      header: 'anioCorte'
    }
  ], [getCommonEditTextFieldProps])

  const handleUploadData = (rows) => {
    console.log(tableData)
  }
  const handleValidateData = (rows) => {
    try {
      setErrorDetail([])
      console.log('data a validar es:', tableData)
      const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/
      const obrasSchema = array().of(object(
        {
          idBpin: string('debe ser un cadena').min(2, 'longitud minima de 2 caracteres').max(20, 'longitud maxima de 20 caracteres').matches(/(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/, 'no coincide con el patrón requerido alfanumerico'),
          municipioObra: number().integer().min(1).typeError('debe ser un numero entero'),
          valorContratoInicial: number().positive()
            .test(
              'is-decimal',
              'el valor debe ser un decimal con maximo 2 digitos despues de la comma',
              (val) => {
                if (val !== undefined) {
                  return patternTwoDigisAfterComma.test(val)
                }
                return true
              }
            )
            .min(5, 'Minimo 0')
            .max(9999999999999.99, 'Maximo 9999999999999.99'),
          idContrato: string('debe ser un cadena').min(2, 'longitud minima de 2 caracteres').max(20, 'longitud maxima de 20 caracteres').matches(/(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/, 'no coincide con el patrón requerido alfanumerico'),
          nombreProyecto: string('debe ser un cadena').trim().lowercase('debe ser minuscula').min(3, 'longitud minima de 3 caracteres').max(64, 'longitud maxima de 64 caracteres'),
          objetoProyecto: string().min(1, 'longitud minima de 1 caracter').max(255, 'longitud maxima de 255 caracter')
        }))
      obrasSchema.validateSync(tableData, { abortEarly: false })
      setUpload(false)
    // csvExporter.generateCsv(data)
    } catch (error) {
      setUpload(true)
      console.log('el error es:', error.inner)
      // console.log('detail:', error.inner.ValidationError[0])
      setErrorDetail(error.inner)
      if (error.response) {
        setError(error.response.data.error.message)
      } else {
        setError(error.message)
      }
    }
  }
  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    setUpload(true)
    // if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    console.log('values:', values)
    const valuesTyping = { ...values }
    tableData[row.index] = valuesTyping
    // send/receive api updates here
    setTableData([...tableData])
    exitEditingMode() // required to exit editing mode
  }

  useEffect(() => {
    const fetchData = async () => {
      const munis = await getMunicipios()
      console.log('munis:', munis.data)
      setMunicipios(munis.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const relationError = {}
    const res = errorDetail.map((detail, idx) => {
      relationError[detail.path.split('.')[0].charAt(1) + '_' + detail.path.split('.')[1]] = detail.message
      return detail.path.split('.')[0].charAt(1) + '_' + detail.path.split('.')[1]
    })
    setColumnsWithError(res)
    setmessagesError(relationError)
    console.log('error detail:', res)
    console.log('error message', relationError)
  }, [errorDetail, tableData])

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
          enableBottomToolbar
          enableTopToolbar
          muiTableBodyRowProps={{ hover: true }}
          editingMode='row'
          enableEditing
          onEditingRowSave={handleSaveRow}
          initialState={{
            columnVisibility: { description: false },
            density: 'compact'
          }}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Box
                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
              >
                <ButtonStyled
                  className='export'
                  onClick={() => { handleValidateData(table.getPrePaginationRowModel().rows) }}
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
