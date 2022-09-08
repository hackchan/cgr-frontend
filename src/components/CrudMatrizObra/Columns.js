import React from 'react'
import { Box } from '@mui/material'
export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'Id'
  },
  {
    accessorKey: 'idBpin',
    header: 'Bpin'
  },
  {
    accessorFn: (row) => `${row.nombreProyecto ? row.nombreProyecto : 'NO ASIGNADO'}`,
    id: 'nombreProyecto',
    header: 'Proyecto',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : 'white'
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) => `${row.objetoProyecto ? row.objetoProyecto : 'NO ASIGNADO'}`,
    id: 'objetoProyecto',
    header: 'Objeto',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : 'white'
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) => new Date(row.fechaSuscripcion),
    size: 200,
    id: 'fechaSuscripcion',
    header: 'Suscripcion',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    sortingFn: 'datetime',
    Cell: ({ cell }) => cell.getValue()?.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorFn: (row) => new Date(row.fechaInicio),
    id: 'fechaInicio',
    header: 'Inicio',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    sortingFn: 'datetime',
    Cell: ({ cell }) => cell.getValue()?.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorFn: (row) => new Date(row.fechaProgramadaTermina),
    size: 250,
    id: 'fechaProgramadaTermina',
    header: 'Programada Termina',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    sortingFn: 'datetime',
    Cell: ({ cell }) => cell.getValue()?.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },

  {
    accessorFn: (row) => new Date(row.fechaTermina),
    size: 200,
    id: 'fechaTermina',
    header: 'Termina',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    sortingFn: 'datetime',
    Cell: ({ cell }) => cell.getValue()?.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorKey: 'valorContratoInicial',
    header: 'Valor Inicial',
    size: 200,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          backgroundColor:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
                ? '#FF033E'
                : '#CD5700',
          borderRadius: '0.25rem',
          color: '#fff',
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
          backgroundColor:
            cell.getValue() < 1000000000
              ? '#1DB954'
              : cell.getValue() >= 10000000000
                ? '#FF033E'
                : '#CD5700',
          borderRadius: '0.25rem',
          color: '#fff',
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
      return <Box sx={(theme) => ({ background: desface < 0.10 ? '#1DB954' : desface >= 0.15 ? '#FF033E' : '#CD5700', borderRadius: '0.25rem', color: '#fff', p: '0.25rem' })}>{cell.getValue() * 100 + '%'}</Box>
    }
  },

  {
    accessorKey: 'avanceFisicoEjecutado',
    header: 'Fisico Ejecutado',
    size: 200,
    Cell: ({ cell }) => {
      const desface = cell.row.original.avanceFisicoProgramado - cell.getValue()
      return <Box sx={(theme) => ({ background: desface < 0.10 ? '#1DB954' : desface >= 0.15 ? '#FF033E' : '#CD5700', borderRadius: '0.25rem', color: '#fff', p: '0.25rem' })}>{cell.getValue() * 100 + '%'}</Box>
    }
  },

  {
    accessorKey: 'avanceFinancieroEjecutado',
    header: 'Financiero Ejecutado'
  },
  {
    accessorKey: 'nroContrato',
    header: 'NroContrato'
  },
  {
    accessorKey: 'cantidadSuspenciones',
    header: 'Cant. Suspenciones'
  },
  {
    accessorKey: 'cantidadProrrogas',
    header: 'Prorrogas'
  },
  {
    accessorKey: 'tiempoSuspenciones',
    header: 'Tiempo Suspenciones'
  },
  {
    accessorKey: 'tiempoProrrogas',
    header: 'Tiempo Prorrogas'
  },
  {
    accessorKey: 'cantidadAdiciones',
    header: 'Cant. Adiciones'
  },
  {
    accessorKey: 'valorTotalAdiciones',
    header: 'Valor Tot. Adiciones'
  },

  {
    accessorKey: 'valorComprometido',
    header: 'Valor Comprometido'
  },
  {
    accessorKey: 'valorObligado',
    header: 'Valor Obligado'
  },
  {
    accessorKey: 'valorPagado',
    header: 'Valor Pagado'
  },
  {
    accessorKey: 'valorAnticipo',
    header: 'Valor Anticipo'
  },
  {
    accessorKey: 'razonSocialContratista',
    header: 'Razon Social Contratista'
  },
  {
    accessorKey: 'idContratista',
    header: 'idContratista'
  },
  {
    accessorKey: 'razonSocialNuevoContratista',
    header: 'razonSocialNuevoContratista'
  },

  {
    accessorKey: 'idNuevoContratista',
    header: 'idNuevoContratista'
  },
  {
    accessorKey: 'observaciones',
    header: 'observaciones'
  },
  {
    accessorKey: 'linkSecop',
    header: 'linkSecop'
  },
  {
    accessorKey: 'nroContratoInterventoria',
    header: 'Contrato Interventoria'
  },
  {
    accessorKey: 'nombreInterventoria',
    header: 'ID Interventoria'
  },

  {
    accessorKey: 'idInterventoria',
    header: 'Nombre Interventoria'
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
    accessorKey: 'sector.name',
    header: 'Sector'
  },

  {
    accessorKey: 'estado.name',
    header: 'Estado'
  },

  {
    accessorKey: 'entidad.name',
    header: 'Entidad'
  },
  {
    accessorKey: 'municipioObra.name',
    header: 'Municipio Obra'
  }

]
//// console.log('el row:', cell.row.original.anioCorte)
      // console.log('el row:', cell.getValue())