import React from 'react'
import { Box } from '@mui/material'
import { format, parse } from 'date-fns'
export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'IdS',
    size: 100
  },

  {
    accessorKey: 'idBpin',
    header: 'Bpin',
    size: 100
  },
  {
    accessorKey: 'idContrato',
    header: 'ID Contrato',
    enableColumnFilterModes: false, // disable changing filter mode for this column
    // filterVariant: 'range',
    size: 150
  },
  {
    accessorFn: (row) =>
      `${row.nombreProyecto ? row.nombreProyecto : 'NO ASIGNADO'}`,
    size: 250,
    id: 'nombreProyecto',
    header: 'Proyecto',
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
      `${row.objetoProyecto ? row.objetoProyecto : 'NO ASIGNADO'}`,
    id: 'objetoProyecto',
    size: 650,
    header: 'Objeto',
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
    accessorFn: (row) => parse(row.fechaSuscripcion, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaSuscripcion',
    header: 'Suscripcion',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorFn: (row) => parse(row.fechaInicio, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaInicio',
    header: 'Inicio',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorFn: (row) =>
      parse(row.fechaProgramadaTermina, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaProgramadaTermina',
    header: 'Programada Termina',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorFn: (row) => parse(row.fechaTermina, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaTermina',
    header: 'Termina',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterVariant: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorKey: 'valorContratoInicial',
    header: 'Valor Inicial',
    size: 200,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
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
    accessorKey: 'valorContratoFinal',
    header: 'Valor Final',
    size: 200,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
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
    accessorKey: 'avanceFisicoProgramado',
    header: 'Fisico Programado',
    size: 200,
    Cell: ({ cell }) => {
      const desface = cell.getValue() - cell.row.original.avanceFisicoEjecutado
      return (
        <Box
          sx={(theme) => ({
            color:
              desface < 0.1
                ? '#1DB954'
                : desface >= 0.15
                  ? '#FF033E'
                  : '#CD5700',
            borderRadius: '0.25rem',
            p: '0.25rem'
          })}
        >
          {cell.getValue() * 100 + '%'}
        </Box>
      )
    }
  },

  {
    accessorKey: 'avanceFisicoEjecutado',
    header: 'Fisico Ejecutado',
    size: 200,
    Cell: ({ cell }) => {
      const desface = cell.row.original.avanceFisicoProgramado - cell.getValue()
      return (
        <Box
          sx={(theme) => ({
            color:
              desface < 0.1
                ? '#1DB954'
                : desface >= 0.15
                  ? '#FF033E'
                  : '#CD5700',
            borderRadius: '0.25rem',
            p: '0.25rem'
          })}
        >
          {cell.getValue() * 100 + '%'}
        </Box>
      )
    }
  },

  {
    accessorKey: 'avanceFinancieroEjecutado',
    header: 'Financiero Ejecutado',
    size: 250
  },
  {
    accessorFn: (row) => `${row.nroContrato ? row.nroContrato : 'NO ASIGNADO'}`,
    id: 'nroContrato',
    size: 200,
    header: 'NroContrato',
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
      `${row.cantidadSuspenciones ? row.cantidadSuspenciones : 0}`,
    id: 'cantidadSuspenciones',
    size: 250,
    header: 'Cant. Suspenciones',
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
    accessorFn: (row) => `${row.cantidadProrrogas ? row.cantidadProrrogas : 0}`,
    id: 'cantidadProrrogas',
    size: 200,
    header: 'Prorrogas',
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
    accessorFn: (row) => `${row.cantidadProrrogas ? row.cantidadProrrogas : 0}`,
    id: 'tiempoSuspenciones',
    size: 250,
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
    accessorFn: (row) => `${row.tiempoProrrogas ? row.tiempoProrrogas : 0}`,
    id: 'tiempoProrrogas',
    size: 250,
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
    accessorFn: (row) => `${row.cantidadAdiciones ? row.cantidadAdiciones : 0}`,
    id: 'cantidadAdiciones',
    size: 200,
    header: 'Cant. Adiciones',
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
    header: 'Valor Tot. Adiciones',
    size: 250,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
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
    accessorKey: 'valorComprometido',
    header: 'Valor Comprometido',
    size: 250,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
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
    accessorKey: 'valorObligado',
    header: 'Valor Obligado',
    size: 200,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
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
    accessorKey: 'valorPagado',
    header: 'Valor Pagado',
    size: 200,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
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
    accessorKey: 'valorAnticipo',
    header: 'Valor Anticipo',
    size: 200,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
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
    id: 'razonSocialContratista',
    header: 'Razon Social Contratista',
    size: 300,
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
    accessorKey: 'idContratista',
    header: 'Id Contratista',
    size: 250,
    Cell: ({ cell }) => <Box>{cell.getValue()}</Box>
  },

  {
    accessorFn: (row) =>
      `${
        row.razonSocialNuevoContratista
          ? row.razonSocialNuevoContratista
          : 'NO ASIGNADO'
      }`,
    id: 'razonSocialNuevoContratista',
    header: 'Razon Social Nuevo Contratista',
    size: 350,
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
    accessorKey: 'idNuevoContratista',
    header: 'Id Nuevo Contratista',
    size: 250,
    Cell: ({ cell }) => <Box>{cell.getValue()}</Box>
  },
  {
    accessorFn: (row) =>
      `${row.observaciones ? row.observaciones : 'NO ASIGNADO'}`,
    id: 'observaciones',
    header: 'Observaciones',
    size: 650,
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
    accessorFn: (row) => `${row.linkSecop ? row.linkSecop : 'NO ASIGNADO'}`,
    id: 'linkSecop',
    header: 'Link Secop',
    size: 650,
    Cell: ({ cell, row }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        <a href={cell.getValue()} target='_blank' rel='noreferrer'>
          {row.original?.linkSecop}
        </a>
      </Box>
    )
    // Cell: ({ cell }) => (
    // <Box
    //   sx={(theme) => ({
    //     color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
    //   })}
    // >
    //   {cell.getValue()}
    // </Box>
    // )
  },
  {
    accessorFn: (row) =>
      `${
        row.nroContratoInterventoria
          ? row.nroContratoInterventoria
          : 'NO ASIGNADO'
      }`,
    id: 'nroContratoInterventoria',
    header: 'Contrato Interventoria',
    size: 250,
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
      `${row.nombreInterventoria ? row.nombreInterventoria : 'NO ASIGNADO'}`,
    id: 'nombreInterventoria',
    header: 'Nombre Interventoria',
    size: 350,
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
    accessorKey: 'idInterventoria',
    header: 'ID Interventoria',
    size: 250,
    Cell: ({ cell }) => <Box>{cell.getValue()}</Box>
  },

  {
    accessorKey: 'diaCorte',
    header: 'diaCorte'
  },

  {
    accessorKey: 'mesCorte',
    header: 'mesCorte'
  },

  {
    accessorKey: 'anioCorte',
    header: 'anioCorte'
  },

  {
    accessorFn: (row) => `${row.sector ? row.sector.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'sector',
    header: 'Sector',
    // size: 300,
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
    accessorFn: (row) => `${row.estado ? row.estado.name : 'NO ASIGNADO'}`,
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
  },

  {
    accessorFn: (row) => `${row.entidad ? row.entidad.name : 'NO ASIGNADO'}`,
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
    accessorFn: (row) =>
      `${row.municipioObra ? row.municipioObra.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'municipioObra',
    header: 'Municipio Obra',
    // size: 300,
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
