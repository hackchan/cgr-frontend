import * as Yup from 'yup'
const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/

const relationsObj = Yup.object().shape({
  entidad: Yup.object().shape().nullable().required('Entidad es obligatorio'),
  sector: Yup.object().shape().nullable().required('Sector es obligatorio')
})

const relations = Yup.object().shape({
  entidad: Yup.number()
    .positive()
    .required('Entidad es obligatorio')
    .typeError('debe ser un número entero'),
  sector: Yup.number()
    .positive()
    .required('Sector es obligatorio')
    .typeError('debe ser un número entero')
})

export const formSchemaProyecto = Yup.object().shape({
  idBpin: Yup.string()
    .required('idBpin es obligatorio')
    .matches(
      /(^[0-9a-zA-Z]*[0-9a-zA-Z-]*[0-9a-zA-Z]$)/,
      'No es un código BPIN válido'
    ),
  entidad: Yup.object().shape().nullable().required('Entidad es obligatorio'),
  sector: Yup.object().shape().nullable().required('Sector es obligatorio'),
  nombreProyecto: Yup.string()
    .required('Nombre proyecto es obligatorio')
    .min(3, 'La longitud mínima es de 3 caracteres')
    .max(64, 'La longitud máxima es de 64 caracteres')
    .matches(
      /(^[a-zA-ZÑñ. ]*[a-zA-Z-_Ññ. ]*[a-zA-ZÑñ. ]$)/,
      'Nombre Proyecto no válido'
    ),
  valorProyecto: Yup.number()
    .positive()
    .test(
      'is-decimal',
      'el valor debe ser un decimal con  máximo 2 dígitos después del punto',
      (val) => {
        if (val !== undefined) {
          return patternTwoDigisAfterComma.test(val)
        }
        return true
      }
    )
    .min(1, 'mínimo 0')
    .max(9999999999999.99, 'máximo 9999999999999.99')
    .typeError('debe ser un número entero y si lleva decimal usar el punto'),
  duracionProyecto: Yup.string()
    .required('Duracion Proyecto es obligatorio')
    .matches(/^([0-9]{1,6})$/, 'No es un valor válido, expresar en días'),
  dependenciaProyecto: Yup.string()
    .required('Dependencia Proyecto es obligatorio')
    .min(3, 'Longitud mínima es de 3 caracteres')
    .max(64, 'La longitud máxima es de 64 caracteres')
    .matches(
      /(^[a-zA-ZÑñ. ]*[a-zA-Z-_Ññ. ]*[a-zA-ZÑñ. ]$)/,
      'Dependencia Proyecto no válido'
    ),

  descripcion: Yup.string()
    .required('Descripción es obligatorio')
    .min(2, 'longitud mínima es de 2 caracteres')
    .max(300, 'longitud máxima es de 2 caracteres')
    .matches(
      /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
      'No es una Descripción válida'
    ),

  objetivoGeneral: Yup.string()
    .required('Descripción es obligatorio')
    .min(2, 'longitud mínima es de 2 caracteres')
    .max(300, 'longitud máxima es de 2 caracteres')
    .matches(
      /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
      'No es una Descripción válida'
    ),

  programaPlanDesarrollo: Yup.string()
    .required('Programa plan desarrollo es obligatorio')
    .min(2, 'longitud mínima es de 2 caracteres')
    .max(300, 'longitud máxima es de 2 caracteres')
    .matches(
      /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
      'No es un programa Plan Desarrollo válido'
    ),
  fechaInicioEjecucion: Yup.string()
    .nullable()
    .required('Fecha Inicio Ejecucion es obligatorio')
    .typeError('no es una fecha válida'),
  fechaCierreEjecucion: Yup.string()
    .nullable()
    .required('Fecha Cierre Ejecucion es obligatorio')
    .typeError('no es una fecha válida'),
  observaciones: Yup.string()
    .required('Descripción es obligatorio')
    .min(2, 'longitud mínima es de 2 caracteres')
    .max(300, 'longitud máxima es de 2 caracteres')
    .matches(
      /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
      'No es una Descripción válida'
    )
})
export const formSchemaProyectoArray = Yup.array().of(formSchemaProyecto)
