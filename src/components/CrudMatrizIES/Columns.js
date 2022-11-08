/* eslint-disable indent */
import React from 'react'
import { Box } from '@mui/material'
export const ColumnsTable = [
  {
    accessorKey: 'id',
    header: 'Id',
    size: 200
  },

  {
    accessorKey: 'semestreReportado',
    header: 'Semestre Reportado',
    size: 300
  },
  {
    accessorKey: 'codigo',
    header: 'Codigo',
    // enableColumnFilterModes: false, // disable changing filter mode for this column
    // filterVariant: 'range',
    size: 250
  },
  {
    accessorFn: (row) => `${row.name ? row.name : 'NO ASIGNADO'}`,
    size: 450,
    id: 'name',
    header: 'Nombre Estudiante',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },
  {
    accessorFn: (row) => `${row.tipoDoc ? row.tipoDoc.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'tipoDoc',
    header: 'Tipo Documento',
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
      </Box>
    )
  },
  {
    accessorFn: (row) => `${row.numeroDoc ? row.numeroDoc : 'NO ASIGNADO'}`,
    id: 'numeroDoc',
    size: 350,
    header: 'Documento',
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) => `${row.programa ? row.programa : 'NO ASIGNADO'}`,
    id: 'programa',
    header: 'Programa',
    size: 650,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) => `${row.sede ? row.sede.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'sede',
    header: 'Sede',
    size: 300,
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
      </Box>
    )
  },

  {
    accessorFn: (row) => `${row.semestre ? row.semestre.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'semestre',
    header: 'Semestre',
    size: 300,
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
      </Box>
    )
  },

  {
    accessorKey: 'valorSemestre',
    header: 'Valor Semestre',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 5000000
              ? '#1DB954'
              : cell.getValue() >= 5000000
              ? '#FF033E'
              : '#CD5700',
          borderRadius: '0.25rem',
          p: '0.25rem'
        })}
      >
        {cell.getValue()?.toLocaleString?.('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Box>
    )
  },
  {
    accessorKey: 'recargo',
    header: 'Recargo',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 5000000
              ? '#1DB954'
              : cell.getValue() >= 5000000
              ? '#FF033E'
              : '#CD5700',
          borderRadius: '0.25rem',
          p: '0.25rem'
        })}
      >
        {cell.getValue()?.toLocaleString?.('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Box>
    )
  },
  {
    accessorKey: 'descuentos',
    header: 'Descuentos',
    size: 300,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color:
            cell.getValue() < 5000000
              ? '#1DB954'
              : cell.getValue() >= 5000000
              ? '#FF033E'
              : '#CD5700',
          borderRadius: '0.25rem',
          p: '0.25rem'
        })}
      >
        {cell.getValue()?.toLocaleString?.('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.tipoDescuento ? row.tipoDescuento : 'NO ASIGNADO'}`,
    id: 'tipoDescuento',
    header: 'Tipo Descuento',
    size: 650,
    Cell: ({ cell }) => (
      <Box
        sx={(theme) => ({
          color: cell.getValue() === 'NO ASIGNADO' ? '#ff22AA' : ''
        })}
      >
        {cell.getValue()?.toUpperCase()}
      </Box>
    )
  },

  {
    accessorFn: (row) =>
      `${row.residencia ? row.residencia.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'residencia',
    header: 'Residencia',
    size: 300,
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
      </Box>
    )
  },

  {
    accessorFn: (row) => `${row.estrato ? row.estrato.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
    id: 'estrato',
    header: 'Estrato',
    size: 300,
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
      </Box>
    )
  },

  {
    accessorFn: (row) => `${row.entidad ? row.entidad.name : 'NO ASIGNADO'}`,
    enableEditing: false,
    // filterVariant: 'range',
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
  },
  {
    accessorKey: 'diaCorte',
    header: 'diaCorte',
    size: 300
  },

  {
    accessorKey: 'mesCorte',
    header: 'mesCorte',
    size: 300
  },

  {
    accessorKey: 'anioCorte',
    header: 'anioCorte',
    size: 300
  }
]
