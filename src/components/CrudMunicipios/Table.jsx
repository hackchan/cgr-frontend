import React from 'react'
import MaterialReactTable from 'material-react-table'

export const Table = ({ columns, data }) => {
  return (
    <MaterialReactTable
      columns={columns} data={data}
      enableGrouping
      enableStickyHeader
      enableStickyFooter
      muiToolbarAlertBannerChipProps={{ color: 'primary' }}
      muiTableContainerProps={{ sx: { maxHeight: 700 } }}
    />
  )
}
