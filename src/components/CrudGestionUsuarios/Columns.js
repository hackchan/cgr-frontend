import React from 'react'
import { Box } from '@mui/material'
export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'Id'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'lastName',
    header: 'LastName'
  },
  {
    accessorKey: 'phone',
    header: 'Celular'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'tipo.name',
    header: 'Tipo'
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
    accessorKey: 'auth.username',
    header: 'Username'
  },
  {
    accessorFn: (row) =>
      `${row.roles ? row.roles.map((rol) => rol.name).join() : 'NO ASIGNADO'}`,
    enableEditing: false,
    size: 150,
    // filterVariant: 'range',
    id: 'roles',
    header: 'Roles',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          // backgroundColor: cell.getValue() === 'NO ASIGNADO' ? 'red' : 'white',
          fontSize: '10px',
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
  }

]
