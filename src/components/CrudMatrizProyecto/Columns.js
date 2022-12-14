/* eslint-disable indent */
import React from 'react'
import { Box } from '@mui/material'
import { format, parse } from 'date-fns'
export const ColumnsTable = [
  {
    accessorKey: 'idBpin',
    header: 'IdBpin',
    size: 200
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
    accessorFn: (row) => `${row.sector ? row.sector.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'sector',
    header: 'Sector',
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
    accessorKey: 'nombreProyecto',
    header: 'Nombre Proyecto',
    // enableColumnFilterModes: false, // disable changing filter mode for this column
    // filterVariant: 'range',
    size: 250
  },
  {
    accessorKey: 'valorProyecto',
    header: 'Valor Proyecto',
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
    accessorFn: (row) => `${row.duracionProyecto ? row.duracionProyecto : 0}`,
    id: 'duracionProyecto',
    size: 250,
    header: 'Duracion Proyecto',
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
      `${row.dependenciaProyecto ? row.dependenciaProyecto : 'NO ASIGNADO'}`,
    size: 450,
    id: 'dependenciaProyecto',
    header: 'Dependencia Proyecto',
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
    accessorFn: (row) => `${row.descripcion ? row.descripcion : 'NO ASIGNADO'}`,
    size: 450,
    id: 'descripcion',
    header: 'Descripcion',
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
      `${row.objetivoGeneral ? row.objetivoGeneral : 'NO ASIGNADO'}`,
    size: 450,
    id: 'objetivoGeneral',
    header: 'Objetivo General',
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
      `${
        row.programaPlanDesarrollo ? row.programaPlanDesarrollo : 'NO ASIGNADO'
      }`,
    size: 450,
    id: 'programaPlanDesarrollo',
    header: 'Programa Plan Desarrollo',
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
      parse(row.fechaInicioEjecucion, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaInicioEjecucion',
    header: 'fecha Inicio Ejecucion',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorFn: (row) =>
      parse(row.fechaCierreEjecucion, 'yyyy-MM-dd', new Date()),
    size: 350,
    id: 'fechaCierreEjecucion',
    header: 'fecha Cierre Ejecucion',
    muiTableHeadCellFilterTextFieldProps: {
      type: 'date'
    },
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => format(cell.getValue(), 'yyyy-MM-dd'),
    Header: ({ column }) => <em>{column.columnDef.header}</em>
  },
  {
    accessorFn: (row) =>
      `${row.observaciones ? row.observaciones : 'NO ASIGNADO'}`,
    size: 450,
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
  }
]
