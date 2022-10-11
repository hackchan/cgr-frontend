import React from 'react'
import { Box } from '@mui/material'
export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'Id',
    size: 120
  },
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorFn: (row) => `${row.active ? 'SI' : 'NO'}`,
    accessorKey: 'active',
    header: 'Active',
    filterSelectOptions: [
      { text: 'SI', value: 'SI' },
      { text: 'NO', value: 'NO' }
    ],
    filterVariant: 'select'
  },
  {
    accessorFn: (row) => `${row.isCapital ? 'SI' : 'NO'}`,
    header: 'Capital',
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
    // filterVariant: 'range',
    id: 'tipo',
    header: 'Tipo',
    // size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          borderRadius: '0.25rem',
          textAlign: 'center',
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
    // filterVariant: 'range',
    id: 'department',
    header: 'Departamento',
    // size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          borderRadius: '0.25rem',
          textAlign: 'center',
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
  }
]
