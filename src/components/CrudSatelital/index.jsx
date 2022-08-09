/* eslint-disable array-callback-return */
import React, { useMemo, useEffect, useContext, useState } from 'react'
import { AppContext } from '../../contex/AppProvidercContext'
import MaterialReactTable from 'material-react-table'
import { Box, Button, ListItemIcon, MenuItem } from '@mui/material'
import { Clear, Edit } from '@mui/icons-material'
import { ExportToCsv } from 'export-to-csv'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { ContainerBox, ButtonAdd } from './styles'
import { Modal } from '../Modal'
import { Register } from './Register'
import { Delete } from './Delete'
import { Update } from './Update'
export const CrudSatelital = () => {
  const [data, setData] = useState([])
  const { getSatelitales } = useContext(AppContext)
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
  const [preData] = useState({ title: 'Satelital', windowsTitle: 'Registar Satelital' })
  useEffect(() => {
    const fetchData = async () => {
      try {
        setReload(false)
        if (!data.length) {
          setIsLoading(true)
        } else {
          setIsRefetching(true)
        }

        const response = await getSatelitales()
        setData(response)
        console.log(data)
      } catch (error) {
        setIsError(true)
        setError(error.message)
      } finally {
        setIsLoading(false)
        setIsRefetching(false)
      }
    }
    fetchData()
  }, [reload])

  const handleSaveRow = ({ row }) => {
    console.log('row:', row.index)
    console.log('row:', row._valuesCache)
    // employeeData[+row.index] = row._valuesCache
    // setEmployeeData([...employeeData])
  }

  const handleExportData = () => {
    csvExporter.generateCsv(data)
  }
  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'id'
    },
    {
      accessorKey: 'name',
      header: 'Nombre'
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
      <ButtonAdd onClick={() => { setModal(true) }}>Nueva {preData.title}</ButtonAdd>

      {modal &&
        <Modal closeModal={setModal}>
          <Register setModal={setModal} setReload={setReload} preData={preData} />
        </Modal>}

      <MaterialReactTable
        columns={columns}
        data={data}
        muiTableToolbarAlertBannerProps={
        isError
          ? {
              color: 'error',
              children: error
            }
          : undefined
      }
        state={{ isLoading, showProgressBars: isRefetching, showAlertBanner: isError }}
        // enableRowSelection // enable some features
        enableClickToCopy
        enableColumnResizing
        enableColumnOrdering
        enableGlobalFilter
        enablePinning
        enableRowActions
        // enableEditing
        // enableRowNumbers
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
          const handleActivate = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              window.alert('activating ' + row.getValue('name'))
            })
          }
          return (
            <Box
              sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
            >
              <Button
                style={{ background: '#94c53c' }}
            // export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant='contained'
              >
                Export All Data
              </Button>
              <Button
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
                onClick={handleActivate}
                variant='contained'
              >
                Activate
              </Button>

            </Box>
          )
        }}
        renderRowActionMenuItems={({ closeMenu, table, row }) => [
          <MenuItem
            key={0}
            onClick={(table) => {
            // View profile logic...

              console.log('row h', row._valuesCache)
              setModalEliminar(true)
              setDataEliminar(row._valuesCache)
              closeMenu()
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <Clear />
            </ListItemIcon>
            Eliminar
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={(table) => {
              setModalUpdate(true)
              setDataUpdate(row._valuesCache)
              closeMenu()
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            Editar
          </MenuItem>

        ]}

      />
    </ContainerBox>

  )
}
