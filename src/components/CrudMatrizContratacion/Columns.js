/* eslint-disable indent */
import React from 'react'
import { Box } from '@mui/material'
import { format, parse } from 'date-fns'
import { dateRelative } from '../../utils/time'
export const ColumnsTable = [
  {
    accessorFn: (row) => `${row.alerta ? 'SI' : 'NO'}`,
    accessorKey: 'alerta',
    header: 'Alerta',
    enableGlobalFilter: false,
    filterSelectOptions: [
      { text: 'SI', value: 'SI' },
      { text: 'NO', value: 'NO' }
    ],
    filterVariant: 'select'
  },
  // {
  // // console.log('messi:', new Date(row.updatedAt).toUTCString())
  // {
  //   accessorKey: 'updatedAt',
  //   header: 'Actualizado1',
  //   size: 300
  // },
  //   accessorKey: 'updatedAt',
  //   header: 'Actualizado1',
  //   size: 300
  // },
  {
    accessorFn: (row) => {
      return (
        format(Date.parse(row.updatedAt), 'yyyy-MM-dd') +
        ' ' +
        dateRelative(row.updatedAt)
      )
    },
    size: 350,
    id: 'updatedAt',
    header: 'Actualizada',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'range',

    sortingFn: 'datetime',
    Cell: ({ cell }) => cell.getValue(),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorKey: 'idContrato',
    header: 'Id Contrato',
    size: 200
  },
  {
    accessorKey: 'id_bpin',
    header: 'Id Bpin',
    size: 200
  },

  {
    accessorFn: (row) =>
      `${row.proyecto?.entidad ? row.proyecto?.entidad?.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'entidad',
    header: 'Entidad',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          borderRadius: '0.25rem',
          textAlign: 'center',
          color: cell.getValue() === 'NO ASIGNADO' ? '' : '#94c53c',
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
  },

  {
    accessorFn: (row) => `${row.linea ? row.linea : 'NO ASIGNADO'}`,
    size: 450,
    id: 'linea',
    header: 'Linea',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${row.objetoContrato ? row.objetoContrato : 'NO ASIGNADO'}`,
    size: 450,
    id: 'objetoContrato',
    header: 'Objeto Contrato',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorKey: 'valorContrato',
    header: 'Valor Contrato',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 5000000
              ? '#1DB954'
              : cell.getValue() >= 5000000
              ? '#FF033E'
              : '#CD5700',
          borderRadius: '0.25rem',
          p: '0.25rem'
        })}
      >
        {cell.getValue()?.toLocaleString?.('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${
        row.razonSocialContratista ? row.razonSocialContratista : 'NO ASIGNADO'
      }`,
    size: 450,
    id: 'razonSocialContratista',
    header: 'Razon Social Contratista',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${row.idContratista ? row.idContratista : 'NO ASIGNADO'}`,
    size: 450,
    id: 'idContratista',
    header: 'ID Contratista',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.domicilioContratista ? row.domicilioContratista : 'NO ASIGNADO'}`,
    size: 450,
    id: 'domicilioContratista',
    header: 'Domicilio Contratista',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${row.telefonoContratista ? row.telefonoContratista : 'NO ASIGNADO'}`,
    size: 450,
    id: 'telefonoContratista',
    header: 'Telefono Contratista',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${row.emailContratista ? row.emailContratista : 'NO ASIGNADO'}`,
    size: 450,
    id: 'emailContratista',
    header: 'Email Contratista',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      parse(row.fechaFirmaContrato, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaFirmaContrato',
    header: 'fecha Firma Contrato',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'range',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorFn: (row) => parse(row.fechaRP, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaRP',
    header: 'Fecha RP',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'range',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorKey: 'valorRP',
    header: 'Valor RP',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 5000000
              ? '#1DB954'
              : cell.getValue() >= 5000000
              ? '#FF033E'
              : '#CD5700',
          borderRadius: '0.25rem',
          p: '0.25rem'
        })}
      >
        {cell.getValue()?.toLocaleString?.('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Box>
    )
  },
  {
    accessorFn: (row) => `${row.codRubroRP ? row.codRubroRP : 'NO ASIGNADO'}`,
    size: 450,
    id: 'codRubroRP',
    header: 'Cod Rubro RP',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.fuenteFinanRP ? row.fuenteFinanRP : 'NO ASIGNADO'}`,
    size: 450,
    id: 'fuenteFinanRP',
    header: 'Fuente Finan RP',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()}
      </Box>
    )
  },
  {
    accessorFn: (row) => `${row.isSupervisor ? 'SI' : 'NO'}`,
    accessorKey: 'isSupervisor',
    size: 300,
    header: 'Es Supervisor',
    enableGlobalFilter: false,
    filterSelectOptions: [
      { text: 'SI', value: 'SI' },
      { text: 'NO', value: 'NO' }
    ],
    filterVariant: 'select'
  },

  {
    accessorFn: (row) =>
      `${row.idInterventor ? row.idInterventor : 'NO ASIGNADO'}`,
    size: 450,
    id: 'idInterventor',
    header: 'ID Interventor',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.nombreInterventor ? row.nombreInterventor : 'NO ASIGNADO'}`,
    size: 450,
    id: 'nombreInterventor',
    header: 'Nombre Interventor',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.tipoVinculacion ? row.tipoVinculacion : 'NO ASIGNADO'}`,
    size: 450,
    id: 'tipoVinculacion',
    header: 'Tipo Vinculacion',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) => parse(row.fechaAprobacion, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaAprobacion',
    header: 'Fecha Aprobacion',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'range',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorFn: (row) =>
      parse(row.fechaInicioContrato, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaInicioContrato',
    header: 'Fecha Inicio Contrato',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'range',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorFn: (row) => `${row.plazoContrato ? row.plazoContrato : 0}`,
    id: 'plazoContrato',
    size: 250,
    header: 'Plazo Contrato',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() > '0' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue() + ' D'}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.unidadEjecucion ? row.unidadEjecucion : 'NO ASIGNADO'}`,
    size: 450,
    id: 'unidadEjecucion',
    header: 'Unidad Ejecucion',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) => `${row.isSupervisor ? 'SI' : 'NO'}`,
    accessorKey: 'anticipo',
    size: 300,
    header: 'Anticipo',
    enableGlobalFilter: false,
    filterSelectOptions: [
      { text: 'SI', value: 'SI' },
      { text: 'NO', value: 'NO' }
    ],
    filterVariant: 'select'
  },

  {
    accessorKey: 'valorPagadoAnticipo',
    header: 'Valor Pagado Anticipo',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 5000000
              ? '#1DB954'
              : cell.getValue() >= 5000000
              ? '#FF033E'
              : '#CD5700',
          borderRadius: '0.25rem',
          p: '0.25rem'
        })}
      >
        {cell.getValue()?.toLocaleString?.('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Box>
    )
  },

  {
    accessorFn: (row) => parse(row.fechaPagoAnticipo, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaPagoAnticipo',
    header: 'Fecha Pago Anticipo',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'range',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorFn: (row) => `${row.cantidadAdiciones ? row.cantidadAdiciones : 0}`,
    id: 'cantidadAdiciones',
    size: 200,
    header: 'Cantidad Adiciones',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() > '0' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()}
      </Box>
    )
  },

  {
    accessorKey: 'valorTotalAdiciones',
    header: 'Valor Total Adiciones',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 5000000
              ? '#1DB954'
              : cell.getValue() >= 5000000
              ? '#FF033E'
              : '#CD5700',
          borderRadius: '0.25rem',
          p: '0.25rem'
        })}
      >
        {cell.getValue()?.toLocaleString?.('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Box>
    )
  },

  {
    accessorFn: (row) => `${row.cantidadProrrogas ? row.cantidadProrrogas : 0}`,
    id: 'cantidadProrrogas',
    size: 200,
    header: 'Cantidad Prorrogas',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() > '0' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()}
      </Box>
    )
  },
  {
    accessorFn: (row) => `${row.tiempoProrrogas ? row.tiempoProrrogas : 0}`,
    id: 'tiempoProrrogas',
    size: 300,
    header: 'Tiempo Prorrogas',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() > '0' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue() + ' D'}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.cantidadSuspenciones ? row.cantidadSuspenciones : 0}`,
    id: 'cantidadSuspenciones',
    size: 300,
    header: 'Cantidad Suspenciones',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() > '0' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.tiempoSuspenciones ? row.tiempoSuspenciones : 0}`,
    id: 'tiempoSuspenciones',
    size: 300,
    header: 'Tiempo Suspenciones',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() > '0' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue() + ' D'}
      </Box>
    )
  },

  {
    accessorKey: 'valorTotalPagos',
    header: 'Valor Total Pagos',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 5000000
              ? '#1DB954'
              : cell.getValue() >= 5000000
              ? '#FF033E'
              : '#CD5700',
          borderRadius: '0.25rem',
          p: '0.25rem'
        })}
      >
        {cell.getValue()?.toLocaleString?.('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      parse(row.fechaTerminaContrato, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaTerminaContrato',
    header: 'fecha Termina Contrato',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'range',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorFn: (row) =>
      parse(row.fechaActaLiquidacion, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaActaLiquidacion',
    header: 'Fecha Acta Liquidacion',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'range',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorFn: (row) =>
      `${row.observaciones ? row.observaciones : 'NO ASIGNADO'}`,
    size: 650,
    id: 'observaciones',
    header: 'Observaciones',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.fuenteRecurso ? row.fuenteRecurso?.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'fuenteRecurso',
    header: 'Fuente Recurso',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          borderRadius: '0.25rem',
          textAlign: 'center',
          color: cell.getValue() === 'NO ASIGNADO' ? '' : '#94c53c',
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
  },

  {
    accessorFn: (row) =>
      `${row.formaContratacion ? row.formaContratacion?.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'formaContratacion',
    header: 'Forma Contratacion',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          borderRadius: '0.25rem',
          textAlign: 'center',
          color: cell.getValue() === 'NO ASIGNADO' ? '' : '#94c53c',
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
  },

  {
    accessorFn: (row) =>
      `${row.claseContrato ? row.claseContrato?.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'claseContrato',
    header: 'Clase Contrato',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          borderRadius: '0.25rem',
          textAlign: 'center',
          color: cell.getValue() === 'NO ASIGNADO' ? '' : '#94c53c',
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
  },
  {
    accessorFn: (row) => `${row.estado ? row.estado?.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'estado',
    header: 'Estado',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          borderRadius: '0.25rem',
          textAlign: 'center',
          color: cell.getValue() === 'NO ASIGNADO' ? '' : '#94c53c',
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
]
