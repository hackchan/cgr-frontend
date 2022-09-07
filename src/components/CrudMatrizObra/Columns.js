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
    accessorKey: 'nombreProyecto',
    header: 'Proyecto'
  },
  {
    accessorKey: 'objetoProyecto',
    header: 'Objeto'
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
            cell.getValue() < 50000
              ? theme.palette.error.dark
              : cell.getValue() >= 800000000000
                ? theme.palette.warning.dark
                : theme.palette.success.dark,
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
            cell.getValue() < 50000
              ? theme.palette.error.dark
              : cell.getValue() >= 800000000000
                ? theme.palette.warning.dark
                : theme.palette.success.dark,
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
    header: 'Fisico Programado'
  },

  {
    accessorKey: 'avanceFisicoEjecutado',
    header: 'Fisico Ejecutado'
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
    accessorKey: 'sector',
    header: 'Sector'
  },

  {
    accessorKey: 'estado',
    header: 'Estado'
  },

  {
    accessorKey: 'entidad',
    header: 'Entidad'
  },
  {
    accessorKey: 'municipioObra',
    header: 'Municipio Obra'
  }

]
