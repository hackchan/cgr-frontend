export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'Id',
    size: 10

  },
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorFn: (row) =>
      `${row.sector ? row.sector.name : 'NO ASIGNADO'}`,
    id: 'sector',
    header: 'Sector'
  }
]
