import React from 'react'

export const ColumnsTable = [
  {
    accessorKey: 'idBpin',
    header: 'idBpin'
  },
  {
    accessorKey: 'idContrato',
    header: 'idContrato'
  },

  {
    accessorKey: 'sector',
    header: 'sector'
  },
  {
    accessorKey: 'municipioObra',
    header: 'municipioObra'
    // muiTableBodyCellEditTextFieldProps: {
    //   required: true,
    //   type: 'number'
    // }
  },
  {
    accessorKey: 'nombreProyecto',
    header: 'nombreProyecto'
  },

  {
    accessorKey: 'objetoProyecto',
    header: 'objetoProyecto'
  },

  {
    accessorKey: 'unidadFuncional',
    header: 'unidadFuncional'
  },

  {
    accessorKey: 'fechaSuscripcion',
    header: 'fechaSuscripcion',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
      type: 'date'
    }
  },

  {
    accessorKey: 'fechaInicio',
    header: 'fechaInicio',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
      type: 'date'
    }
  },
  {
    accessorKey: 'fechaProgramadaTermina',
    header: 'fechaProgramadaTermina',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
      type: 'date'
    }
  },

  {
    accessorKey: 'fechaTermina',
    header: 'fechaTermina',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
      type: 'date'
    }
  },

  {
    accessorKey: 'valorContratoInicial',
    header: 'valorContratoInicial'
  },

  {
    accessorKey: 'valorContratoFinal',
    header: 'valorContratoFinal'
  },

  {
    accessorKey: 'avanceFisicoProgramado',
    header: 'avanceFisicoProgramado',
    size: 200
  },

  {
    accessorKey: 'avanceFisicoEjecutado',
    header: 'avanceFisicoEjecutado'
  },

  {
    accessorKey: 'avanceFinancieroEjecutado',
    header: 'avanceFinancieroEjecutado',
    size: 250
  },
  {
    accessorKey: 'nroContrato',
    header: 'nroContrato',
    size: 200
  },

  {
    accessorKey: 'cantidadSuspenciones',
    header: 'cantidadSuspenciones',
    size: 200
  },

  {
    accessorKey: 'cantidadProrrogas',
    header: 'cantidadProrrogas',
    size: 200
  },

  {
    accessorKey: 'tiempoSuspenciones',
    header: 'tiempoSuspenciones',
    size: 200
  },

  {
    accessorKey: 'tiempoProrrogas',
    header: 'tiempoProrrogas',
    size: 200
  },

  {
    accessorKey: 'cantidadAdiciones',
    header: 'cantidadAdiciones',
    size: 200
  },

  {
    accessorKey: 'valorTotalAdiciones',
    header: 'valorTotalAdiciones',
    size: 200
  },

  {
    accessorKey: 'origen',
    header: 'origen',
    size: 200
  },

  {
    accessorKey: 'valorComprometido',
    header: 'valorComprometido'
  },

  {
    accessorKey: 'valorObligado',
    header: 'valorObligado'
  },

  {
    accessorKey: 'valorPagado',
    header: 'valorPagado'
  },

  {
    accessorKey: 'valorAnticipo',
    header: 'valorAnticipo'
  },

  {
    accessorKey: 'estado',
    header: 'estado'
  },

  {
    accessorKey: 'razonSocialContratista',
    header: 'razonSocialContratista'
  },

  {
    accessorKey: 'idContratista',
    header: 'idContratista',
    size: 250
  },

  {
    accessorKey: 'razonSocialNuevoContratista',
    header: 'razonSocialNuevoContratista',
    size: 250
  },

  {
    accessorKey: 'idNuevoContratista',
    header: 'idNuevoContratista',
    size: 250
  },

  {
    accessorKey: 'observaciones',
    header: 'observaciones',
    size: 250
  },

  {
    accessorKey: 'linkSecop',
    disableFilters: true,
    enableGlobalFilter: false,
    header: 'linkSecop',
    Cell: ({ cell, row }) => (
      <a href={cell.getValue()} target='_blank' rel='noreferrer'>
        {row.original?.linkSecop}
      </a>
    )

  },

  {
    accessorKey: 'nroContratoInterventoria',
    header: 'nroContratoInterventoria',
    size: 250
  },

  {
    accessorKey: 'nombreInterventoria',
    header: 'nombreInterventoria',
    size: 250
  },

  {
    accessorKey: 'idInterventoria',
    header: 'idInterventoria',
    size: 250
  },

  {
    accessorKey: 'diaCorte',
    header: 'diaCorte'
  },

  {
    accessorKey: 'mesCorte',
    header: 'mesCorte'
  },

  {
    accessorKey: 'anioCorte',
    header: 'anioCorte'
  }]
