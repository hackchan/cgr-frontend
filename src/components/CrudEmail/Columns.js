import React from 'react'
import { Box } from '@mui/material'
export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'Id',
    size: 120
  },
  {
    accessorKey: 'email',
    header: 'Email'
    // Cell: editableSizeCell,
    // muiTableBodyCellEditTextFieldProps: () => ({
    //   children: usStates.map((state) => (
    //     <MenuItem key={state} value={state}>
    //       {state}
    //     </MenuItem>
    //   )),
    //   select: true
    // })
    // muiTableHeadCellProps: {
    //   sx: (theme) => ({ color: theme.palette.primary.main })
    // }
  },
  {
    accessorFn: (row) => `${row.register ? 'SI' : 'NO'}`,
    accessorKey: 'register',
    header: 'Register',
    enableGlobalFilter: false,
    filterSelectOptions: [
      { text: 'SI', value: 'SI' },
      { text: 'NO', value: 'NO' }
    ],
    filterVariant: 'select'
  },
  {
    accessorFn: (row) => `${row.entidad ? row.entidad.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    enableColumnFilterModes: false,
    enableFilters: false,
    id: 'entidad',
    header: 'Entidad',
    size: 450,
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
