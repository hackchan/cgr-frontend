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
import { DeleteIconStyle, EditIconStyle, PlaylistAddIconStyle, CloudUploadIconStyle } from '../../styles/icons'
import { ButtonStyled } from '../../styles/button'
import { Modal } from '../Modal'
import { ModalB } from '../ModalB'
import { Register } from './Register'
import { Delete } from './Delete'
import { Update } from './Update'
import { CsvParserPresProyecto } from '../CsvPresProyecto '
import config from '../../config'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { isEntidad } from '../../utils/user'
import { TitleModule } from '../../styles/TitleModule'
export const MatrizContratacion = () => {
  const {
    state,
    GetContratacion,
    AddContrato,
    DeleteContrato,
    UpdateContratacion,
    GetEntidad,
    GetClaseContrato,
    GetOrigenRecursoObra,
    GetEstadoContrato,
    GetFormaContrato,
    GetProyectosByEntidad

  } = useContext(AppContext)
  const [user] = useLocalStorage('user', false)

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
  const [modalUpdateShow, setModalUpdateShow] = useState(false)
  const [modalCsv, setModalCsv] = useState(false)
  // const [modal, setModal] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
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
  const [isBasicUsr, setIsBasicUsr] = useState(false)
  useEffect(() => {
    const usrCGR = isEntidad(user)
    setIsBasicUsr(usrCGR)
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data.length) {
          setIsLoading(true)
        } else {
          setIsRefetching(true)
        }

        const response = await GetContratacion(pagination, globalFilter, columnFilters, sorting, user)
        setData(response.data)
        setRowCount(response.cantidad)
      } catch (error) {
        setIsError(true)
        if (error.response) {
          setError(error.response.data.error.message)
        } else {
          setError(error.message)
        }
      } finally {
        setReload(false)
        setIsLoading(false)
        setIsRefetching(false)
      }
    }
    fetchData()
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    columnFilters,
    globalFilter,
    sorting,
    reload])

  const handleExportData = (rows) => {
    csvExporter.generateCsv(rows.map((row) => {
      const rowModify = { ...row._valuesCache, fechaCierreEjecucion: row.original.fechaCierreEjecucion, fechaInicioEjecucion: row.original.fechaInicioEjecucion, sector: row.original.sector.id }
      console.log('row1:', row._valuesCache)
      console.log('row2:', row.original)
      delete rowModify.entidad
      delete rowModify.updatedAt
      delete rowModify.alerta

      return rowModify
    }))
    // csvExporter.generateCsv(data)
  }
  const columns = useMemo(() => ColumnsTable, [])

  const csvOptions = {
    quoteStrings: '"',
    decimalSeparator: '.',
    fieldSeparator: '|',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    headers: columns.map((c) => c.header)

  }
  const csvExporter = new ExportToCsv(csvOptions)
  return (
    <ContainerBox>
      <TitleModule>Matriz Contrataci??n
      </TitleModule>
      {modalEliminar &&
        <Modal closeModal={setModalEliminar}>
          <Delete data={dataEliminar} closeModal={setModalEliminar} preData={preData} setReload={setReload} DeleteContrato={DeleteContrato} modedark={state.darkMode} />
        </Modal>}

      <ModalB
        show={modalCsv} fullscreen={modalCsv} animation={false} onHide={() => setModalCsv(false)} title={preData.update} backdrop='static' keyboard={false}
      >
        <CsvParserPresProyecto setModalCsv={setModalCsv} setReload={setReload} preData={preData} MatrizCargada={AddContrato} GetEntidad={GetEntidad} user={user} isBasicUsr={isBasicUsr} modedark={state.darkMode} />
      </ModalB>

      <ModalB show={modalUpdateShow} fullscreen={modalUpdateShow} animation={false} onHide={() => setModalUpdateShow(false)} title={preData.update}>
        <Update setModalUpdateShow={setModalUpdateShow} setReload={setReload} preData={preData} data={dataUpdate} UpdateContratacion={UpdateContratacion} GetEntidad={GetEntidad} user={user} isBasicUsr={isBasicUsr} modedark={state.darkMode} />
      </ModalB>

      <ModalB show={modalShow} fullscreen={modalShow} animation={false} onHide={() => setModalShow(false)} title={preData.register}>
        <Register setModalShow={setModalShow} setReload={setReload} preData={preData} AddContrato={AddContrato} GetEntidad={GetEntidad} GetClaseContrato={GetClaseContrato} GetOrigenRecursoObra={GetOrigenRecursoObra} GetEstadoContrato={GetEstadoContrato} GetFormaContrato={GetFormaContrato} GetProyectosByEntidad={GetProyectosByEntidad} user={user} isBasicUsr={isBasicUsr} modedark={state.darkMode} />
      </ModalB>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={data}
          localization={config.localization}
          getRowId={(row) => row.id}
          initialState={{ showColumnFilters: true, density: 'compact', pagination: { pageSize: 20, pageIndex: 0 } }}
          muiTableBodyRowProps={({ row }) => ({
            sx: {

              backgroundColor: row.index % 2 === 0 ? 'rgba(52, 54, 245, 0.08)' : ''
            }
          })}
          muiTableBodyCellProps={{ sx: { border: 'none' } }}
          muiTableHeadCellProps={{
            className: 'tableHeaderCell'
          }}
          muiToolbarAlertBannerProps={
        isError
          ? {
              color: 'error',
              children: error
            }
          : undefined
      }
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          rowCount={rowCount}
          state={{
            globalFilter,
            columnFilters,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting
          }}
          muiTablePaginationProps={{
            labelRowsPerPage: 'filas por p??gina',
            showFirstButton: true,
            showLastButton: true,
            rowsPerPageOptions: [20],
            SelectProps: { native: true }
          }}
          muiTableContainerProps={{ className: 'tableContainer' }}
          muiTableHeadProps={{
            className: 'tableHeader'
          }}
          manualFiltering
          manualPagination
          manualSorting
          enableRowActions
          positionActionsColumn='first'
          positionPagination='bottom'
          enableColumnResizing
          // enableStickyHeader
          enableRowVirtualization
          // virtualizerProps={{ overscan: 25 }}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Box
                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
              >
                <ButtonStyled
                  disabled={table.getRowModel().rows.length === 0}
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
                <ButtonStyled
                  className='csv'
                  // style={{ background: '#94c' }}
                  onClick={() => { setModalCsv(true) }}
                  startIcon={<CloudUploadIconStyle />}
                  variant='contained'
                >
                  Cargar csv
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
                    setDataEliminar(row.original)
                  }}
                />
              </Tooltip>
              <Tooltip title={preData.update} placement='top'>
                <EditIconStyle
                  variant='contained'
                  onClick={() => {
                    setModalUpdateShow(true)
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
