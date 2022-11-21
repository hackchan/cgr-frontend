/* eslint-disable array-callback-return */
import React, { useMemo, useEffect, useState, useContext } from 'react'
import { AppContext } from '../../contex/AppProvidercContext'
import { ColumnsTable } from './Columns'
import { Config } from './Config'
import MaterialReactTable from 'material-react-table'
import { Box, Tooltip, createTheme, ThemeProvider, Typography } from '@mui/material'
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
import { useLocalStorage } from '../../hooks/useLocalStorage'
export const GestionUsurios = () => {
  const {
    state,
    AddUser,
    UpdateUser,
    DeleteUser,
    GetUsers,
    GetTypeUsers,
    GetRoles,
    GetEntidad
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
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const listaRolesUser = user?.roles.map((rol) => {
      return rol.name
    })
    setIsAdmin(['ADMIN', 'JEDI'].some((value) => listaRolesUser?.includes(value)))
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

        const response = await GetUsers(pagination, globalFilter, columnFilters, sorting)
        setData(response.data)
        setRowCount(response.cantidad)
        setIsError(false)
      } catch (error) {
        setIsError(true)
        if (error.response) {
          setError(error.response.data.error.message)
        } else {
          setError(error.message)
        }
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
          <Delete data={dataEliminar} closeModal={setModalEliminar} preData={preData} setReload={setReload} DeleteUser={DeleteUser} modedark={state.darkMode} />
        </Modal>}

      <ModalB show={modalUpdateShow} fullscreen={modalUpdateShow} animation={false} onHide={() => setModalUpdateShow(false)} title={preData.update}>
        <Update setModalUpdateShow={setModalUpdateShow} setReload={setReload} preData={preData} data={dataUpdate} UpdateUser={UpdateUser} GetRoles={GetRoles} GetEntidad={GetEntidad} GetTypeUsers={GetTypeUsers} user={user} isAdmin={isAdmin} modedark={state.darkMode} />
      </ModalB>
      {/* <ButtonAdd onClick={() => { setModal(true) }}>Nuevo {preData.title}</ButtonAdd> */}
      <ModalB show={modalShow} fullscreen={modalShow} animation={false} onHide={() => setModalShow(false)} title={preData.register}>
        <Register setModalShow={setModalShow} setReload={setReload} preData={preData} AddUser={AddUser} GetTypeUsers={GetTypeUsers} GetRoles={GetRoles} GetEntidad={GetEntidad} user={user} isAdmin={isAdmin} modedark={state.darkMode} />
      </ModalB>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableExpanding
          localization={preData.localization}
          initialState={preData.initialState}
          muiTableBodyRowProps={({ row }) => ({
            sx: {

              backgroundColor: row.index % 2 === 0 ? 'rgba(52, 54, 245, 0.08)' : ''
            }
          })}
          muiTableBodyCellProps={{ sx: { border: 'none' } }}
          muiTableHeadCellProps={{
            className: 'tableHeaderCell'
          }}
          enableMultiSort
          enableGlobalFilter
          positionGlobalFilter='right'
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}
            >
              {/* <img
                alt='avatar'
                height={200}
                src={row.original.roles}
                loading='lazy'
                style={{ borderRadius: '50%' }}
              /> */}
              <Box sx={{ textAlign: 'center' }}>
                {/* <Typography variant='h6'>Roles:</Typography> */}
                <Typography>
                  roles:
                  {row.original.roles.map((role) => {
                    return role.name + ' '
                  })}

                </Typography>
                <Typography>
                  entidades:
                  {row.original.entidades.map((entidad) => {
                    return entidad.name + ' '
                  })}

                </Typography>

              </Box>
            </Box>
          )}
          muiTableContainerProps={{ className: 'tableContainer' }}
          muiTableHeadProps={{
            className: 'tableHeader'
          }}
          // muiTableHeadCellFilterTextFieldProps={{
          //   sx: { m: '0.5rem 0', width: '100%' },
          //   variant: 'outlined'
          // }}
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
          muiToolbarAlertBannerProps={
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
          enableBottomToolbar
          rowCount={rowCount}
          positionToolbarAlertBanner='bottom'
        // onEditRowSubmit={handleSaveRow}
          onCellEditBlur={handleSaveRow}
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
