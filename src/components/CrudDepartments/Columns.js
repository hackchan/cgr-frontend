import React from 'react'
import { Box } from '@mui/material'
export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'id',
    size: 120
  },
  {
    accessorKey: 'name',
    header: 'Nombre'
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
    accessorKey: 'latitude',
    header: 'Latitud'
  },
  {
    accessorKey: 'longitude',
    header: 'Longitud'
  },
  {
    accessorFn: (row) =>
      `${row.satelital ? row.satelital.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'satelital',
    header: 'satelital',
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
