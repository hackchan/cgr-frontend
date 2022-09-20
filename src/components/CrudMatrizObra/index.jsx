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
import { ModalB } from '../ModalB'
import { Register } from './Register'
import { Delete } from './Delete'
import { Update } from './Update'
export const MatrizObra = () => {
  const {
    state,
    GetMatrizObras,
    DeleteMatrizObra,
    AddMatrizObra,
    UpdateMatrizObra,
    GetSectorObra,
    GetOrigenRecursoObra,
    GetEstadoObra,
    GetEntidad,
    getDepartments,
    getMunicipios
  } = useContext(AppContext)

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

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [modalShow, setModalShow] = useState(false)
  // const [modal, setModal] = useState(false)
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

        const response = await GetMatrizObras(pagination, globalFilter, columnFilters, sorting)
        setData(response.data)
        setRowCount(response.cantidad)
        setIsError(false)
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

  const handleSaveRow = ({ row }) => {
    // employeeData[+row.index] = row._valuesCache
    // setEmployeeData([...employeeData])
  }

  const handleExportData = (rows) => {
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
          <Delete data={dataEliminar} closeModal={setModalEliminar} preData={preData} setReload={setReload} DeleteMatrizObra={DeleteMatrizObra} modedark={state.darkMode} />
        </Modal>}

      {modalUpdate &&
        <Modal closeModal={setModalUpdate}>
          <Update setModal={setModalUpdate} setReload={setReload} preData={preData} data={dataUpdate} UpdateMatrizObra={UpdateMatrizObra} modedark={state.darkMode} />
        </Modal>}
      {/* <ButtonAdd onClick={() => { setModal(true) }}>Nuevo {preData.title}</ButtonAdd> */}
      <ModalB show={modalShow} fullscreen={modalShow} onHide={() => setModalShow(false)} title={preData.register}>
        <Register setReload={setReload} preData={preData} AddMatrizObra={AddMatrizObra} GetSectorObra={GetSectorObra} GetOrigenRecursoObra={GetOrigenRecursoObra} GetEstadoObra={GetEstadoObra} GetEntidad={GetEntidad} getDepartments={getDepartments} getMunicipios={getMunicipios} modedark={state.darkMode} />
      </ModalB>
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
            rowsPerPageOptions: [12, 20, 50, 100],
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
        //  enableRowVirtualization
        //  virtualizerProps={{ overscan: 50 }}
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
                  onClick={() => { handleExportData(table.getPrePaginationRowModel().rows) }}
                  startIcon={<FileDownloadIcon />}
                  variant='contained'
                >
                  Exportar
                </ButtonStyled>
                <ButtonStyled
                  className='new'
                  onClick={() => { setModalShow(true) }}
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
            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
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
