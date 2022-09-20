/* eslint-disable array-callback-return */
import React, { useMemo, useEffect, useState, useContext } from 'react'
import { AppContext } from '../../contex/AppProvidercContext'
import { ColumnsTable } from './Columns'
import { Config } from './Config'
import MaterialReactTable from 'material-react-table'
import { Box, Tooltip, createTheme, ThemeProvider } from '@mui/material'
import { esES } from '@mui/material/locale'
// import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { ExportToCsv } from 'export-to-csv'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { ContainerBox } from '../../styles/box'
import { DeleteIconStyle, EditIconStyle, PlaylistAddIconStyle } from '../../styles/icons'
import { ButtonStyled } from '../../styles/button'
import { Modal } from '../Modal'
import { Register } from './Register'
import { Delete } from './Delete'
import { Update } from './Update'
export const CrudDepartmets = () => {
  const { state, getDepartments, AddDepartment, DeleteDepartment, UpdateDepartment, getSatelitales, GetUserCGR } = useContext(AppContext)

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
  // const [usStates] = useState([
  //   'Alabama',
  //   'Alaska',
  //   'American Samoa',
  //   'Arizona',
  //   'Arkansas',
  //   'California',
  //   'Colorado',
  //   'Connecticut',
  //   'Delaware',
  //   'Florida',
  //   'Georgia',
  //   'Guam',
  //   'Hawaii',
  //   'Idaho',
  //   'Illinois',
  //   'Indiana',
  //   'Iowa',
  //   'Kansas',
  //   'Kentucky',
  //   'Louisiana',
  //   'Maine',
  //   'Maryland',
  //   'Massachusetts',
  //   'Michigan',
  //   'Minnesota',
  //   'Mississippi',
  //   'Missouri',
  //   'Montana',
  //   'Nebraska',
  //   'Nevada',
  //   'New Hampshire',
  //   'New Jersey',
  //   'New Mexico',
  //   'New York',
  //   'North Carolina',
  //   'North Dakota',
  //   'Ohio',
  //   'Oklahoma',
  //   'Oregon',
  //   'Palau',
  //   'Pennsylvania',
  //   'Rhode Island',
  //   'South Carolina',
  //   'South Dakota',
  //   'Tennessee',
  //   'Texas',
  //   'Utah',
  //   'Vermont',
  //   'Virgin Island',
  //   'Virginia',
  //   'Washington',
  //   'West Virginia',
  //   'Wisconsin',
  //   'Wyoming'
  // ])
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataEliminar, setDataEliminar] = useState({})
  const [reload, setReload] = useState(false)
  const [preData] = useState(Config)
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState([])
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: preData.pageIndex,
    pageSize: preData.pageSize
  })
  const [rowCount, setRowCount] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setReload(false)
        if (!data.length) {
          setIsLoading(true)
        } else {
          setIsRefetching(true)
        }

        const response = await getDepartments(pagination, globalFilter, columnFilters, sorting)
        console.log('sorting:', sorting)
        setData(response.data)
        setRowCount(response.cantidad)
        setIsError(false)
        console.log('globalFiter:', globalFilter)
      } catch (error) {
        setIsError(true)
        setError(error.message)
      } finally {
        setIsLoading(false)
        setIsRefetching(false)
      }
    }
    fetchData()
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    columnFilters,
    sorting,
    reload])
  // const boxStyle = {
  //   display: 'flex',
  //   alignItems: 'left',
  //   justifyContent: 'space-between',
  //   gap: '1rem',
  //   '&:hover': { color: 'hotpink' }
  // }
  // function editableSizeCell ({
  //   cell
  // }) {
  //   return (
  //     <Tooltip title='double click para editar' placement='top'>
  //       <Box sx={boxStyle}>
  //         <Typography>{cell.getValue()}</Typography>
  //         <ModeEditIcon />
  //       </Box>
  //     </Tooltip>
  //   )
  // }

  const handleSaveRow = ({ row }) => {
    console.log('row:', row.index)
    console.log('row:', row._valuesCache)
    // employeeData[+row.index] = row._valuesCache
    // setEmployeeData([...employeeData])
  }

  const handleExportData = (rows) => {
    console.log('rows:', rows)
    csvExporter.generateCsv(rows.map((row) => row._valuesCache))
    // csvExporter.generateCsv(data)
  }
  const columns = useMemo(() => ColumnsTable, [])

  const csvOptions = {
    quoteStrings: '"',
    decimalSeparator: ',',
    fieldSeparator: '|',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    headers: columns.map((c) => c.header)
  }
  const csvExporter = new ExportToCsv(csvOptions)
  return (
    <ContainerBox>
      {modalEliminar &&
        <Modal closeModal={setModalEliminar}>
          <Delete data={dataEliminar} closeModal={setModalEliminar} preData={preData} setReload={setReload} DeleteDepartment={DeleteDepartment} modedark={state.darkMode} />
        </Modal>}

      {modalUpdate &&
        <Modal closeModal={setModalUpdate}>
          <Update setModal={setModalUpdate} setReload={setReload} preData={preData} data={dataUpdate} getSatelitales={getSatelitales} UpdateDepartment={UpdateDepartment} modedark={state.darkMode} />
        </Modal>}
      {/* <ButtonAdd onClick={() => { setModal(true) }}>Nuevo {preData.title}</ButtonAdd> */}

      {modal &&
        <Modal closeModal={setModal}>
          <Register setModal={setModal} setReload={setReload} preData={preData} getSatelitales={getSatelitales} AddDepartment={AddDepartment} GetUserCGR={GetUserCGR} modedark={state.darkMode} />
        </Modal>}
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={data}
          localization={preData.localization}
          initialState={preData.initialState}
          enableMultiSort
          enableGlobalFilter
          positionGlobalFilter='right'
          muiTableHeadCellProps={{
            className: 'tableHeaderCell'
          }}
          muiTableContainerProps={{ className: 'tableContainer' }}
          muiTableHeadProps={{
            className: 'tableHeader'
          }}
        // enableRowSelection
          enableClickToCopy
          enableColumnOrdering
          enableColumnDragging
          enableColumnResizing
          enablePinning
        // enableRowOrdering
          onRowDrop={({ draggedRow, targetRow }) => {
            if (targetRow) {
              data.splice(targetRow.index, 0, data.splice(draggedRow.index, 1)[0])
              setData([...data])
            }
          }}
        // enablePagination
          muiTablePaginationProps={{
            labelRowsPerPage: 'filas por página',
            rowsPerPageOptions: [10, 20, 50, 100],
            showFirstButton: true,
            showLastButton: true,
            SelectProps: { native: true }
          }}
          enableRowActions
          positionActionsColumn='last'
          positionPagination='bottom'
          manualPagination
          manualSorting
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          editingMode='cell'
        // enableEditing
        // paginateExpandedRows
        // onPaginationChange
          muiSearchTextFieldProps={{

            variant: 'outlined',
            placeholder: 'Busqueda global',
            label: 'Buscar',
            InputLabelProps: { shrink: true }

          }}
          muiTableToolbarAlertBannerProps={
        isError
          ? {
              color: 'error',
              children: error
            }
          : undefined
      }
          state={{
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting
          }}
        // state={{ isLoading, showProgressBars: isRefetching, showAlertBanner: isError, density: 'compact', pagination }}
        // enableRowSelection // enable some features
        // enableClickToCopy
        // enableColumnResizing
        // enableColumnOrdering
        // enableGlobalFilter
        // enablePinning
        // enableRowActions
        // autoResetPagination
        // enableEditing
        // enableRowNumbers
        // enableRowVirtualization
        // virtualizerProps={{ overscan: 50 }}
          enableBottomToolbar={false}
          rowCount={rowCount}
          positionToolbarAlertBanner='bottom'
        // onEditRowSubmit={handleSaveRow}
          onCellEditBlur={handleSaveRow}
          renderTopToolbarCustomActions={({ table }) => {
            // const handleDeactivate = () => {
            //   table.getSelectedRowModel().flatRows.map((row) => {
            //     console.log(row._valuesCache)
            //     window.alert('deactivating ', row._valuesCache)
            //   })
            // }
            // const handleActivate = () => {
            //   table.getSelectedRowModel().flatRows.map((row) => {
            //     window.alert('activating ' + row.getValue('name'))
            //   })
            // }
            return (
              <Box
                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
              >
                <ButtonStyled
                  className='export'
                  // style={{ background: '#94c53c' }}
            // export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                  onClick={() => { handleExportData(table.getPrePaginationRowModel().rows) }}
                  startIcon={<FileDownloadIcon />}
                  variant='contained'
                >
                  Exportar
                </ButtonStyled>
                <ButtonStyled
                  className='new'
                  // style={{ background: '#94c' }}
                  onClick={() => { setModal(true) }}
                  startIcon={<PlaylistAddIconStyle />}
                  variant='contained'
                >
                  Nuevo
                </ButtonStyled>
                {/* <Button
                color='error'
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleDeactivate}
                variant='contained'
              >
                Deactivate
              </Button>
              <Button
                color='success'
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                // onClick={handleActivate}
                variant='contained'
              >
                Activate
              </Button> */}

              </Box>
            )
          }}
          renderRowActions={({ row }) => (
            <div>
              <Tooltip title={preData.delete} placement='top'>
                <DeleteIconStyle
                  variant='contained'
                  onClick={() => {
                    setModalEliminar(true)
                    setDataEliminar(row._valuesCache)
                  }}
                />
              </Tooltip>
              <Tooltip title={preData.update} placement='top'>
                <EditIconStyle
                  variant='contained'
                  onClick={() => {
                    setModalUpdate(true)
                    setDataUpdate(row.original)

                    //       closeMenu()
                  }}
                />
              </Tooltip>
            </div>
          )}
        />
      </ThemeProvider>

    </ContainerBox>

  )
}
