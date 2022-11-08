const table = 'Matriculas IES'
export const Config = {
  pageIndex: 0,
  pageSize: 20,
  table,
  relationTable: null,
  register: `Registrar ${table}`,
  update: `Actualizar ${table}`,
  delete: `Eliminar ${table}`,
  labelRowsPerPage: 'filas por página',
  buttonRegister: 'Adicionar Matricula',
  buttonUpdate: 'Actualizar Matricula',
  rowsPerPageOptions: [10, 20, 50, 100],
  initialState: {
    showGlobalFilter: false,
    showColumnFilters: false,
    density: 'compact',
    sorting: [{ id: 'id', desc: true }]
  }
}
