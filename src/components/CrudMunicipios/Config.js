const table = 'Municipio'
export const Config = {
  pageIndex: 0,
  pageSize: 12,
  table,
  relationTable: 'Departamento',
  register: `Registrar ${table}`,
  update: `Actualizar ${table}`,
  delete: `Eliminar ${table}`,
  labelRowsPerPage: 'filas por página',
  rowsPerPageOptions: [12, 20, 50, 100],
  initialState: {
    showGlobalFilter: false,
    showColumnFilters: false,
    density: 'compact',
    sorting: [{ id: 'id', desc: true }]
  },
  localization: {
    actions: 'Acciones',
    cancel: 'Cancelar',
    changeFilterMode: 'Cambia el modo de filtro',
    clearFilter: 'Filtro claro',
    clearSearch: 'Borrar búsqueda',
    clearSort: 'Ordenar claro',
    columnActions: 'Acciones de columna',
    edit: 'Editar',
    expand: 'Expandir',
    expandAll: 'Expandir todo',
    filterByColumn: 'Filtrar por {column}',
    filterMode: 'Modo de filtro: {filterType}',
    grab: 'Agarrar',
    groupByColumn: 'Agrupar por {column}',
    groupedBy: 'Agrupados por ',
    hideAll: 'Ocultar todo',
    hideColumn: 'Ocultar columna de {column}',
    rowActions: 'Acciones de fila',
    pinToLeft: 'Alfile a la izquierda',
    pinToRight: 'Alfile a la derecha',
    save: 'Salvar',
    search: 'Búsqueda',
    selectedCountOfRowCountRowsSelected:
      '{selectedCount} de {rowCount} fila(s) seleccionadas',
    showAll: 'Mostrar todo',
    showAllColumns: 'Mostrar todas las columnas',
    showHideColumns: 'Mostrar/Ocultar columnas',
    showHideFilters: 'Alternar filtros',
    showHideSearch: 'Alternar búsqueda',
    sortByColumnAsc: 'Ordenar por {column} ascendente',
    sortByColumnDesc: 'Ordenar por {column} descendiendo',
    thenBy: ', entonces por ',
    toggleDensity: 'Alternar relleno denso',
    toggleFullScreen: 'Alternar pantalla completa',
    toggleSelectAll: 'Seleccionar todo',
    toggleSelectRow: 'Seleccionar fila',
    ungroupByColumn: 'Desagrupar por {column}',
    unpin: 'Quitar pasador',
    unsorted: 'Sin clasificar',
    move: 'Mover'
  }
}
