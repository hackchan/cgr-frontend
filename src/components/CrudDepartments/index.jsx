/* eslint-disable array-callback-return */
import React, { useMemo, useEffect, useContext, useState } from 'react'
import { AppContext } from '../../contex/AppProvidercContext'
import MaterialReactTable from 'material-react-table'
import { Box, Button, ListItemIcon, MenuItem, Tooltip, Typography } from '@mui/material'
import { Clear, Add, PlaylistAdd } from '@mui/icons-material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { ExportToCsv } from 'export-to-csv'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { ContainerBox, ButtonAdd, DeleteIconStyle, EditIconStyle } from './styles'
import { Modal } from '../Modal'
import { Register } from './Register'
import { Delete } from './Delete'
import { Update } from './Update'
export const CrudDepartmets = () => {
  const [usStates] = useState([
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ])
  const [data, setData] = useState([])
  const { getDepartments } = useContext(AppContext)
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
  const [preData] = useState({ title: 'Departamento', windowsTitleRegister: 'Registar Departamento', windowsTitleUpdate: 'Actualizar Departamento' })
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState([])
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12
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
  const boxStyle = {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'space-between',
    gap: '1rem',
    '&:hover': { color: 'hotpink' }
  }
  function editableSizeCell ({
    cell
  }) {
    return (
      <Tooltip title='double click para editar' placement='top'>
        <Box sx={boxStyle}>
          <Typography>{cell.getValue()}</Typography>
          <ModeEditIcon />
        </Box>
      </Tooltip>
    )
  }

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
  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'id',
      size: 90
    },
    {
      accessorKey: 'name',
      header: 'Nombre'
      // Cell: editableSizeCell,
      // muiTableBodyCellEditTextFieldProps: () => ({
      //   children: usStates.map((state) => (
      //     <MenuItem key={state} value={state}>
      //       {state}
      //     </MenuItem>
      //   )),
      //   select: true
      // })
      // muiTableHeadCellProps: {
      //   sx: (theme) => ({ color: theme.palette.primary.main })
      // }

    },
    {
      accessorKey: 'latitude',
      header: 'Latitud'
    },
    {
      accessorKey: 'longitude',
      header: 'Longitud'
    },
    {
      accessorFn: (row) => `${row.satelital ? row.satelital.name : 'NO ASIGNADO'}`,
      enableEditing: true,
      // filterVariant: 'range',
      id: 'satelital',
      header: 'satelital',
      // size: 300,
      Cell: ({ cell }) => (
        <Box
          sx={(theme) => ({
            backgroundColor:
                    cell.getValue() === 'NO ASIGNADO'
                      ? 'red'
                      : 'white',
            borderRadius: '0.25rem',
            textAlign: 'center',
            color: cell.getValue() === 'NO ASIGNADO'
              ? 'white'
              : 'black',
            // maxWidth: '9ch',
            p: '0.15rem'
          })}
        >
          {cell.getValue()?.toUpperCase()}
          {/* {cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })} */}
        </Box>
      )

    }
  ], [])
  // const dataTable = useMemo(() => data)
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
          <Delete data={dataEliminar} closeModal={setModalEliminar} preData={preData} setReload={setReload} />
        </Modal>}

      {modalUpdate &&
        <Modal closeModal={setModalUpdate}>
          <Update setModal={setModalUpdate} setReload={setReload} preData={preData} data={dataUpdate} />
        </Modal>}
      {/* <ButtonAdd onClick={() => { setModal(true) }}>Nuevo {preData.title}</ButtonAdd> */}

      {modal &&
        <Modal closeModal={setModal}>
          <Register setModal={setModal} setReload={setReload} preData={preData} />
        </Modal>}

      <MaterialReactTable
        columns={columns}
        data={data}
        initialState={{
          showGlobalFilter: false,
          showColumnFilters: false,
          density: 'compact',
          sorting: [{ id: 'id', desc: true }]
        }}
        enableMultiSort
        enableGlobalFilter
        positionGlobalFilter='right'
        muiTableHeadCellProps={{
          sx: {
            // backgroundColor: 'rgba(2, 0, 5, .6)',
            // borderRight: '1px solid rgba(224,224,224,1)',
            color: '#89b637'
          }
        }}
        muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
        muiTableHeadProps={{
          sx: {
            position: 'sticky',
            top: 0,
            zIndex: 1
          }
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
        enableRowVirtualization
        enableBottomToolbar={false}
        virtualizerProps={{ overscan: 50 }}
        rowCount={rowCount}
        positionToolbarAlertBanner='bottom'
        // onEditRowSubmit={handleSaveRow}
        onCellEditBlur={handleSaveRow}
        renderToolbarTopCustomActions={({ table }) => {
          const handleDeactivate = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              console.log(row._valuesCache)
              window.alert('deactivating ', row._valuesCache)
            })
          }
          // const handleActivate = () => {
          //   table.getSelectedRowModel().flatRows.map((row) => {
          //     window.alert('activating ' + row.getValue('name'))
          //   })
          // }
          return (
            <Box
              sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
            >
              <Button
                style={{ background: '#94c53c' }}
            // export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={() => { handleExportData(table.getPrePaginationRowModel().rows) }}
                startIcon={<FileDownloadIcon />}
                variant='contained'
              >
                Exportar
              </Button>
              <Button
                style={{ background: '#94c' }}
                onClick={() => { setModal(true) }}
                startIcon={<PlaylistAdd />}
                variant='contained'
              >
                Nuevo
              </Button>
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
            <Tooltip title='Eliminar departamento' placement='top'>
              <DeleteIconStyle
                variant='contained'
                onClick={() => {
                  setModalEliminar(true)
                  setDataEliminar(row._valuesCache)
                }}
              />
            </Tooltip>
            <Tooltip title='Editar departamento' placement='top'>
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
        // renderRowActionMenuItems={({ closeMenu, table, row }) => [
        //   <MenuItem
        //     key={0}
        //     onClick={(table) => {
        //     // View profile logic...
        //       console.log('row h', row._valuesCache)
        //       setModalEliminar(true)
        //       setDataEliminar(row._valuesCache)
        //       closeMenu()
        //     }}
        //     sx={{ m: 0 }}
        //   >
        //     <ListItemIcon>
        //       <DeleteIconStyle />
        //     </ListItemIcon>
        //     Eliminar
        //   </MenuItem>,
        //   <MenuItem
        //     key={1}
        //     onClick={(table) => {
        //       setModalUpdate(true)
        //       // data[+row.index] = row.original
        //       // setData([...data])
        //       // console.log(row._valuesCache)
        //       // console.log(row.original)
        //       // console.log(row.index)
        //       setDataUpdate(row.original)
        //       closeMenu()
        //     }}
        //     sx={{ m: 0 }}
        //   >
        //     <ListItemIcon>
        //       <EditIconStyle />
        //     </ListItemIcon>
        //     Editar
        //   </MenuItem>

        // ]}

      />
    </ContainerBox>

  )
}
