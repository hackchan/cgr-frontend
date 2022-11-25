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
  }
]
