import React from 'react'
import { Box } from '@mui/material'
export const ColumnsTable = [
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorFn: (row) => `${row.active ? 'SI' : 'NO'}`,
    accessorKey: 'active',
    header: 'Active',
    enableGlobalFilter: false,
    filterSelectOptions: [
      { text: 'SI', value: 'SI' },
      { text: 'NO', value: 'NO' }
    ],
    filterVariant: 'select'
  },
  {
    accessorFn: (row) => `${row.isCapital ? 'SI' : 'NO'}`,
    accessorKey: 'isCapital',
    header: 'Capital',
    enableGlobalFilter: false,
    filterFn: (row, id, filterValue) =>
      row.getValue(id).startsWith(filterValue),
    filterSelectOptions: [
      { text: 'SI', value: 'SI' },
      { text: 'NO', value: 'NO' }
    ],
    filterVariant: 'select'
  },
  {
    accessorKey: 'divipola',
    header: 'Divipola'
  },
  {
    accessorKey: 'latitude',
    header: 'Latitud'
  },
  {
    accessorKey: 'longitude',
    header: 'Longitud'
  },
  {
    accessorFn: (row) => `${row.tipo ? row.tipo.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    size: 150,
    // filterVariant: 'range',
    id: 'tipo',
    header: 'Tipo',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          borderRadius: '0.25rem',
          color: cell.getValue() === 'NO ASIGNADO' ? 'white' : '#94c53c',
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
      `${row.department ? row.department.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    size: 150,
    id: 'department',
    header: 'Departamento',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          borderRadius: '0.25rem',
          color: cell.getValue() === 'NO ASIGNADO' ? 'white' : '#94c53c',
          p: '0.15rem'
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  }
]
