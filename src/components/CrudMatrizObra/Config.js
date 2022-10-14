const table = 'Contrato de Obra'
export const Config = {
  pageIndex: 0,
  pageSize: 50,
  table,
  relationTable: null,
  register: `Registrar ${table}`,
  update: `Actualizar ${table}`,
  delete: `Eliminar ${table}`,
  labelRowsPerPage: 'filas por página',
  buttonRegister: 'Adicionar Contrato',
  buttonUpdate: 'Actualizar Contrato',
  rowsPerPageOptions: [10, 20, 50, 100],
  initialState: {
    showGlobalFilter: false,
    showColumnFilters: false,
    density: 'compact',
    sorting: [{ id: 'id', desc: true }]
  }

}
