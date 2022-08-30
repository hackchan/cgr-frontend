/* eslint-disable array-callback-return */
import React, { useMemo, useEffect, useContext, useState } from 'react'
import { AppContext } from '../../contex/AppProvidercContext'
import MaterialReactTable from 'material-react-table'
import { Box, ThemeProvider, Tooltip, createTheme } from '@mui/material'
import { DeleteIconStyle, EditIconStyle, PlaylistAddIconStyle } from '../../styles/icons'
import { ButtonStyled } from '../../styles/button'
import { esES } from '@mui/material/locale'
import { ExportToCsv } from 'export-to-csv'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { ColumnsTable } from './Columns'
import { Config } from './Config'
import { Modal } from '../Modal'
import { Register } from './Register'
import { Delete } from './Delete'
import { Update } from './Update'
import { ContainerBox } from '../../styles/box'
export const CrudTipoMunicipios = () => {
  const [data, setData] = useState([])
  const {
    getTipoMunicipios,
    AddTipoMunicipios,
    DeleteTipoMunicipios,
    UpdateTipoMunicipios,
    state
  } = useContext(AppContext)
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setReload(false)
        if (!data.length) {
          setIsLoading(true)
        } else {
          setIsRefetching(true)
        }

        const response = await getTipoMunicipios()
        setData(response)
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
  }

  const handleExportData = () => {
    csvExporter.generateCsv(data)
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
          <Delete data={dataEliminar} closeModal={setModalEliminar} preData={preData} setReload={setReload} DeleteTipoMunicipios={DeleteTipoMunicipios} modedark={state.darkMode} />
        </Modal>}

      {modalUpdate &&
        <Modal closeModal={setModalUpdate}>
          <Update setModal={setModalUpdate} setReload={setReload} preData={preData} data={dataUpdate} UpdateTipoMunicipios={UpdateTipoMunicipios} modedark={state.darkMode} />
        </Modal>}

      {modal &&
        <Modal closeModal={setModal}>
          <Register setModal={setModal} setReload={setReload} preData={preData} AddTipoMunicipios={AddTipoMunicipios} modedark={state.darkMode} />
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
          enableClickToCopy
          enableColumnOrdering
          enableColumnDragging
          enableColumnResizing
          enablePinning
          onRowDrop={({ draggedRow, targetRow }) => {
            if (targetRow) {
              data.splice(targetRow.index, 0, data.splice(draggedRow.index, 1)[0])
              setData([...data])
            }
          }}
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
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isRefetching
          }}
          enableBottomToolbar={false}
          positionToolbarAlertBanner='bottom'
          onCellEditBlur={handleSaveRow}
          renderToolbarTopCustomActions={({ table }) => {
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
                  onClick={() => { setModal(true) }}
                  startIcon={<PlaylistAddIconStyle />}
                  variant='contained'
                >
                  Nuevo
                </ButtonStyled>
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
