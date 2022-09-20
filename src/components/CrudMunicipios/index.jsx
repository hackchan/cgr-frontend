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
import {Table} from './Table'
export const CrudMunicipios = () => {
  const {
    state, getMunicipios, AddMunicipio, DeleteMunicipio, UpdateMunicipio, getDepartments, getTipoMunicipios
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

        const response = await getMunicipios(pagination, globalFilter, columnFilters, sorting)
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
  }

  const handleExportData = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row._valuesCache))
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
    <Table columns={columns} data={ data} />

  )
}
