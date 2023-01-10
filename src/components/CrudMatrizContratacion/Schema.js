import * as Yup from 'yup'

const idPattern = /(^[0-9a-zA-Z]*[0-9a-zA-Z-]*[0-9a-zA-Z]$)/
const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/
const textoSinTilde = /(^[a-zA-ZÑñ. ]*[a-zA-Z-_Ññ. ]*[a-zA-ZÑñ. ]$)/
const textoConTilde = /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/

const idContratistaPatter = /^([0-9A-Z]{1,30})$/
const nombreContratistaPatter = /(^[0-9a-zA-ZÑñ ]*[0-9a-zA-Z-_Ññ ]*[0-9a-zA-ZÑñ ]$)/
const direccion = /(^[a-zA-ZÑñ. ]*[0-9a-zA-Z-_#Ññ. ]*[0-9a-zA-ZÑñ. ]$)/
const celular = /^(300|301|302|304|305|324|302|323|304|305|310|311|312|313|314|320|321|322|323|315|316|317|318|319|324|350|351)[0-9]{7}$/
const email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

const cantidad = /^([0-9]{1,6})$/
// const relationsObj = Yup.object().shape({
//   entidad: Yup.object().shape().nullable().required('Entidad es obligatorio'),
//   sector: Yup.object().shape().nullable().required('Sector es obligatorio')
// })

// const relations = Yup.object().shape({
//   entidad: Yup.number()
//     .positive()
//     .required('Entidad es obligatorio')
//     .typeError('debe ser un número entero'),
//   sector: Yup.number()
//     .positive()
//     .required('Sector es obligatorio')
//     .typeError('debe ser un número entero')
// })

export const formSchemaContrato = Yup.object().shape({
  idContrato: Yup.string()
    .required('Id Contrato es obligatorio')
    .matches(idPattern, 'No es un código Contrato válido'),
  entidad: Yup.object().shape().nullable().required('Entidad es obligatorio'),
  fuenteRecurso: Yup.object()
    .shape()
    .nullable()
    .required('Fuente Recurso es obligatorio'),
  proyecto: Yup.object().shape().nullable().required('Proyecto es obligatorio'),
  sector: Yup.object().shape().nullable().required('Sector es obligatorio'),
  linea: Yup.string()
    .required('Linea es obligatorio')
    .min(3, 'La longitud mínima es de 3 caracteres')
    .max(64, 'La longitud máxima es de 64 caracteres')
    .matches(textoSinTilde, 'Linea no válido'),
  objetoContrato: Yup.string()
    .required('Objeto Contrato es obligatorio')
    .min(3, 'La longitud mínima es de 3 caracteres')
    .max(256, 'La longitud máxima es de 256 caracteres')
    .matches(textoConTilde, 'Objeto Contrato no válido'),
  claseContrato: Yup.object()
    .shape()
    .nullable()
    .required('Clase de Contrato es obligatorio'),
  valorContrato: Yup.number()
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
  razonSocialContratista: Yup.string()
    .required('Razon Social Contratista es obligatorio')
    .min(3, 'La longitud mínima es de 3 caracteres')
    .max(100, 'La longitud máxima es de 100 caracteres')
    .matches(nombreContratistaPatter, 'Razon Social Contratista no válido'),
  idContratista: Yup.string()
    .required('Id Contratista es obligatorio')
    .matches(idContratistaPatter, 'ID Constratista no válido '),
  domicilioContratista: Yup.string()
    .required('Domicilio Contratista es obligatorio')
    .matches(direccion, 'Domicilio Contratista no válido '),
  telefonoContratista: Yup.string()
    .required('Celular Contratista es obligatorio')
    .matches(celular, 'Celular Contratista no válido '),
  emailContratista: Yup.string()
    .required('Email Contratista es obligatorio')
    .matches(email, 'Email Contratista no válido '),
  fechaFirmaContrato: Yup.string()
    .nullable()
    .required('Fecha Firma Contrato es obligatorio')
    .typeError('no es una fecha válida'),
  fechaRP: Yup.string()
    .nullable()
    .required('Fecha Registro Presupuestal es obligatorio')
    .typeError('no es una fecha válida'),
  formaContratacion: Yup.object()
    .shape()
    .nullable()
    .required('Forma Contratacion es obligatorio'),
  valorRP: Yup.number()
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
  codRubroRP: Yup.string()
    .required('Codigo Rubro es obligatorio')
    .matches(textoConTilde, 'Codigo Rubro Contratista no válido '),
  fuenteFinanRP: Yup.string()
    .required('Fuente Financiación es obligatorio')
    .matches(textoConTilde, 'Fuente Financiación Contratista no válido '),
  interventor: Yup.boolean().required('Interventor es obligatorio'),
  idInterventor: Yup.string()
    .required('Id Interventor es obligatorio')
    .matches(idContratistaPatter, 'ID Interventor no válido '),
  nombreInterventor: Yup.string()
    .required('Nombre Interventor es obligatorio')
    .min(3, 'La longitud mínima es de 3 caracteres')
    .max(100, 'La longitud máxima es de 100 caracteres')
    .matches(nombreContratistaPatter, 'Nombre Interventor no válido'),
  tipoVinculacion: Yup.string()
    .required('Tipo Vinculación es obligatorio')
    .min(3, 'La longitud mínima es de 3 caracteres')
    .max(100, 'La longitud máxima es de 100 caracteres')
    .matches(textoConTilde, 'Tipo Vinculación no válido'),
  fechaAprobacion: Yup.string()
    .nullable()
    .required('Fecha Aprobación Garantía Única es obligatorio')
    .typeError('no es una fecha válida'),
  fechaInicioContrato: Yup.string()
    .nullable()
    .required('Fecha Inicio del contrato es obligatorio')
    .typeError('no es una fecha válida'),
  plazoContrato: Yup.string()
    .required('Plazo Contrato es obligatorio')
    .matches(cantidad, 'Plazo Contrato no válido '),
  unidadEjecucion: Yup.string()
    .required('Unidad Ejecución es obligatorio')
    .matches(textoConTilde, 'Unidad Ejecución no válido '),
  valorPagadoAnticipo: Yup.number()
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
  fechaPagoAnticipo: Yup.string()
    .nullable()
    .required('Fecha Pago Anticipo es obligatorio')
    .typeError('no es una fecha válida'),
  cantidadAdiciones: Yup.string()
    .required('Cantidad Adiciones es obligatorio')
    .matches(cantidad, 'Cantidad Adiciones no válido '),
  valorTotalAdiciones: Yup.number()
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
  cantidadProrrogas: Yup.string()
    .required('Cantidad Prorrogas es obligatorio')
    .matches(cantidad, 'Cantidad Prorrogas no válido '),
  tiempoProrrogas: Yup.string()
    .required('Tiempo Prorrogas es obligatorio')
    .matches(cantidad, 'Cantidad Prorrogas no válido '),
  cantidadSuspenciones: Yup.string()
    .required('Cantidad Suspenciones es obligatorio')
    .matches(cantidad, 'Cantidad Prorrogas no válido '),
  tiempoSuspenciones: Yup.string()
    .required('Tiempo Suspenciones es obligatorio')
    .matches(cantidad, 'Tiempo Suspenciones  no válido '),
  valorTotalPagos: Yup.number()
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
  fechaTerminaContrato: Yup.string()
    .nullable()
    .required('Fecha Termina Contrato es obligatorio')
    .typeError('no es una fecha válida'),
  fechaActaLiquidacion: Yup.string()
    .nullable()
    .required('Fecha Acta Liquidacion es obligatorio')
    .typeError('no es una fecha válida'),
  estado: Yup.object().shape().nullable().required('Estado es obligatorio'),
  observaciones: Yup.string()
    .required('Observación es obligatorio')
    .min(2, 'longitud mínima es de 2 caracteres')
    .max(300, 'longitud máxima es de 2 caracteres')
    .matches(
      /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
      'No es una Observación  válida'
    )
})
// export const formSchemaProyectoArray = Yup.array().of(formSchemaProyecto)
