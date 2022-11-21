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
import { CsvParser } from '../CsvParse'
import config from '../../config'
import { useLocalStorage } from '../../hooks/useLocalStorage'
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
    getMunicipios,
    GetMunicipiosByDepartment,
    GetDepartamentoByIdMunicipio
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
  const [user] = useLocalStorage('user', false)
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data.length) {
          setIsLoading(true)
        } else {
          setIsRefetching(true)
        }

        const response = await GetMatrizObras(pagination, globalFilter, columnFilters, sorting)
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
    csvExporter.generateCsv(rows.map((row) => row._valuesCache))
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
      {modalEliminar &&
        <Modal closeModal={setModalEliminar}>
          <Delete data={dataEliminar} closeModal={setModalEliminar} preData={preData} setReload={setReload} DeleteMatrizObra={DeleteMatrizObra} modedark={state.darkMode} />
        </Modal>}

      <ModalB
        show={modalCsv} fullscreen={modalCsv} animation={false} onHide={() => setModalCsv(false)} title={preData.update} backdrop='static' keyboard={false}
      >
        <CsvParser setModalCsv={setModalCsv} setReload={setReload} preData={preData} MatrizCargada={AddMatrizObra} GetEntidad={GetEntidad} user={user} modedark={state.darkMode} />
      </ModalB>

      <ModalB show={modalUpdateShow} fullscreen={modalUpdateShow} animation={false} onHide={() => setModalUpdateShow(false)} title={preData.update}>
        <Update setModalUpdateShow={setModalUpdateShow} setReload={setReload} preData={preData} data={dataUpdate} UpdateMatrizObra={UpdateMatrizObra} GetSectorObra={GetSectorObra} GetOrigenRecursoObra={GetOrigenRecursoObra} GetEstadoObra={GetEstadoObra} GetEntidad={GetEntidad} getDepartments={getDepartments} getMunicipios={getMunicipios} GetMunicipiosByDepartment={GetMunicipiosByDepartment} GetDepartamentoByIdMunicipio={GetDepartamentoByIdMunicipio} user={user} modedark={state.darkMode} />
      </ModalB>
      {/* <ButtonAdd onClick={() => { setModal(true) }}>Nuevo {preData.title}</ButtonAdd> */}
      <ModalB show={modalShow} fullscreen={modalShow} animation={false} onHide={() => setModalShow(false)} title={preData.register}>
        <Register setModalShow={setModalShow} setReload={setReload} preData={preData} AddMatrizObra={AddMatrizObra} GetSectorObra={GetSectorObra} GetOrigenRecursoObra={GetOrigenRecursoObra} GetEstadoObra={GetEstadoObra} GetEntidad={GetEntidad} getDepartments={getDepartments} getMunicipios={getMunicipios} GetMunicipiosByDepartment={GetMunicipiosByDepartment} GetDepartamentoByIdMunicipio={GetDepartamentoByIdMunicipio} user={user} modedark={state.darkMode} />
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
            labelRowsPerPage: 'filas por página',
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
                    setDataEliminar(row._valuesCache)
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
