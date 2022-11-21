import React from 'react'
import { Box } from '@mui/material'
export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'id'
  },
  {
    accessorFn: (row) => `${row.cgn ? row.cgn : 'NO ASIGNADO'}`,
    id: 'Cgn',
    header: 'Cgn',
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
    accessorKey: 'nit',
    header: 'Nit'
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    size: 250,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // color: cell.getValue() === 'NO ASIGNADO' ? 'white' : '#94c53c'
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${row.categoria ? row.categoria.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'categoria',
    header: 'Categoria',
    size: 400,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? 'white' : '#9147ff'
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${row.subsector ? row.subsector.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'subsector',
    header: 'Subsector',
    size: 500,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? 'white' : '#9147ff'
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${row.municipio ? row.municipio.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'municipio',
    header: 'Municipio',
    // size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? 'white' : '#94c53c'
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) =>
      `${
        row.municipio?.department ? row.municipio?.department?.name : 'NO ASIGNADO'
      }`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'department',
    header: 'Departamento',
    // size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? 'white' : '#94c53c'
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  }
]
