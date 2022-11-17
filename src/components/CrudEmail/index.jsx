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
import { ModalB } from '../ModalB'
import { Modal } from '../Modal'
import { Register } from './Register'
import { Delete } from './Delete'
import { Update } from './Update'
import { ContainerBox } from '../../styles/box'
import config from '../../config'
export const CrudEmails = () => {
  const [data, setData] = useState([])
  const {
    GetEntidad,
    GetEmails,
    AddEmails,
    DeleteEmails,
    UpdateEmail,
    state
  } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [modalUpdateShow, setModalUpdateShow] = useState(false)
  // const [modal, setModal] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  // const [modal, setModal] = useState(false)
  // const [modalEliminar, setModalEliminar] = useState(false)
  // const [modalUpdate, setModalUpdate] = useState(false)
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
        // setReload(false)
        if (!data.length) {
          setIsLoading(true)
        } else {
          setIsRefetching(true)
        }

        const response = await GetEmails()
        console.log('respose emails:', response)
        setData(response.data)
      } catch (error) {
        setIsError(true)
        if (error.response) {
          setError(error.response.data.error.message)
        } else {
          setError(error.message)
        }
        // setIsError(true)
        // setError(error.message)
      } finally {
        setReload(false)
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
          <Delete data={dataEliminar} closeModal={setModalEliminar} preData={preData} setReload={setReload} DeleteEmails={DeleteEmails} modedark={state.darkMode} />
        </Modal>}

      <ModalB show={modalUpdateShow} fullscreen={modalUpdateShow} animation={false} onHide={() => setModalUpdateShow(false)} title={preData.update}>
        <Update setModalUpdateShow={setModalUpdateShow} setReload={setReload} preData={preData} data={dataUpdate} UpdateEmail={UpdateEmail} GetEntidad={GetEntidad} modedark={state.darkMode} />
      </ModalB>

      <ModalB show={modalShow} fullscreen={modalShow} animation={false} onHide={() => setModalShow(false)} title={preData.register}>
        <Register setModalShow={setModalShow} setReload={setReload} preData={preData} AddEmails={AddEmails} GetEntidad={GetEntidad} modedark={state.darkMode} />
      </ModalB>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={data}
          localization={config.localization}
          initialState={{ showColumnFilters: false, density: 'compact', pagination: { pageSize: 20, pageIndex: 0 } }}
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
          muiToolbarAlertBannerProps={
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
          enableBottomToolbar
          positionToolbarAlertBanner='bottom'
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
