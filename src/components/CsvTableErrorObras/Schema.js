
import { object, string, number, array, date } from 'yup'
const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/
export const obrasSchema = array().of(
  object({
    idBpin: string('debe ser un cadena')
      .min(2, 'longitud mínima de 2 carácteres')
      .max(20, 'longitud máxima de 20 carácteres')
      .matches(
        /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
        'no coincide con el patrón requerido alfanumerico'
      ),
    municipioObra: number('debe ser un número')
      .integer()
      .min(1, 'debe ser un entero mayor a 0')
      .typeError('debe ser un número entero'),
    valorContratoInicial: number()
      .positive()
      .test(
        'is-decimal',
        'el valor debe ser un decimal con  máximo 2 dígitos después de la comma',
        (val) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val)
          }
          return true
        }
      )
      .min(5, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),
    idContrato: string('debe ser un cadena')
      .min(2, 'longitud mínima de 2 carácteres')
      .max(20, 'longitud máxima de 20 carácteres')
      .matches(
        /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
        'no coincide con el patrón requerido alfanumerico'
      ),
    nombreProyecto: string('debe ser un cadena')
      .trim()
      .lowercase('debe ser minúscula')
      .min(3, 'longitud mínima de 3 carácteres')
      .max(64, 'longitud máxima de 64 carácteres'),
    objetoProyecto: string()
      .min(1, 'longitud mínima de 1 carácter')
      .max(255, 'longitud máxima de 255 carácter'),
    unidadFuncional: string()
      .min(1, 'longitud mínima de 1 carácter')
      .max(255, 'longitud máxima de 255 carácter'),
    fechaSuscripcion: date(),
    fechaInicio: date(),
    fechaProgramadaTermina: date(),
    fechaTermina: date(),
    valorContratoFinal: number()
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
      .min(5, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),
    avanceFisicoProgramado: number()
      .min(0, 'el valor minimo es cero')
      .max(1, 'el valor máximo es 1')
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
      .typeError(
        'debe ser un número entero con máximo 2 dígitos después del punto'
      ),
    avanceFisicoEjecutado: number()
      .min(0, 'el valor minimo es cero')
      .max(1, 'el valor  máximo es 1')
      .test(
        'is-decimal',
        'el valor debe ser un decimal con máximo 2 dígitos después del punto',
        (val) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val)
          }
          return true
        }
      )
      .typeError(
        'debe ser un número entero con máximo 2 dígitos después del punto'
      ),
    avanceFinancieroEjecutado: number()
      .min(0, 'el valor minimo es cero')
      .max(1, 'el valor  máximo es 1')
      .test(
        'is-decimal',
        'el valor debe ser un decimal con máximo 2 dígitos después del punto',
        (val) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val)
          }
          return true
        }
      )
      .typeError(
        'debe ser un número entero con máximo 2 dígitos después del punto'
      ),
    nroContrato: string('debe ser un cadena')
      .min(2, 'longitud mínima de 2 carácteres')
      .max(20, 'longitud máxima de 20 carácteres')
      .matches(
        /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
        'no coincide con el patrón requerido alfanumerico'
      ),
    cantidadSuspenciones: number('debe ser un número')
      .integer()
      .min(0, 'el valor minimo es 0')
      .max(100, 'el valor  máximo es 100')
      .typeError('debe ser un número entero'),
    cantidadProrrogas: number('debe ser un número')
      .integer()
      .min(0, 'el valor minimo es 0')
      .max(200, 'el valor  máximo es 200')
      .typeError('debe ser un número entero'),
    tiempoSuspenciones: number('debe ser un número')
      .integer()
      .min(0, 'el valor minimo es 0')
      .max(99999, 'el maximo de dias permitido es 99999')
      .typeError('debe ser un número entero'),
    tiempoProrrogas: number('debe ser un número')
      .integer()
      .min(0, 'el valor minimo es 0')
      .max(99999, 'el maximo de dias permitido es 99999')
      .typeError('debe ser un número entero'),
    cantidadAdiciones: number('debe ser un número')
      .integer()
      .min(0, 'el valor minimo es 0')
      .max(100, 'el valor  máximo es 100')
      .typeError('debe ser un número entero'),
    valorTotalAdiciones: number()
      .positive()
      .test(
        'is-decimal',
        'el valor debe ser un decimal con  máximo 2 dígitos después de la comma',
        (val) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val)
          }
          return true
        }
      )
      .min(5, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),
    valorComprometido: number()
      .positive()
      .test(
        'is-decimal',
        'el valor debe ser un decimal con  máximo 2 dígitos después de la comma',
        (val) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val)
          }
          return true
        }
      )
      .min(5, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),
    valorObligado: number()
      .positive()
      .test(
        'is-decimal',
        'el valor debe ser un decimal con  máximo 2 dígitos después de la comma',
        (val) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val)
          }
          return true
        }
      )
      .min(5, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),
    valorPagado: number()
      .positive()
      .test(
        'is-decimal',
        'el valor debe ser un decimal con  máximo 2 dígitos después de la comma',
        (val) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val)
          }
          return true
        }
      )
      .min(5, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),
    valorAnticipo: number()
      .positive()
      .test(
        'is-decimal',
        'el valor debe ser un decimal con  máximo 2 dígitos después de la comma',
        (val) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val)
          }
          return true
        }
      )
      .min(5, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),
    razonSocialContratista: string().matches(
      /^[a-zA-Z0-9 ]{3,100}$/,
      'no coincide con el patrón requerido alfanumerico'
    ),
    idContratista: string('debe ser un cadena').matches(
      /^[a-zA-Z0-9]+$/,
      'Puede ser una cadena de texto y numeros sin espacios'
    ),
    razonSocialNuevoContratista: string().matches(
      /^[a-zA-Z0-9 ]{3,100}$/,
      'no coincide con el patrón requerido alfanumerico'
    ),
    idNuevoContratista: string('debe ser un cadena').matches(
      /^[a-zA-Z0-9]+$/,
      'Puede ser una cadena de texto y numeros sin espacios'
    ),
    observaciones: string()
      .min(1, 'mínimo de caracteres 1')
      .max(255, 'máximo caracteres 255'),
    linkSecop: string().url('debe ser una url valida'),
    nroContratoInterventoria: string('debe ser un cadena')
      .min(2, 'longitud mínima de 2 carácteres')
      .max(30, 'longitud máxima de 20 carácteres')
      .matches(
        /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
        'no coincide con el patrón requerido alfanumerico'
      ),
    nombreInterventoria: string('debe ser un cadena')
      .min(3, 'longitud mínima de 3 carácteres')
      .max(100, 'longitud máxima de 100 carácteres')
      .matches(
        /^[a-zA-Z0-9 ]{3,100}$/,
        'no coincide con el patrón requerido alfanumerico'
      ),
    idInterventoria: string('debe ser un cadena').matches(
      /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
      'no coincide con el patrón requerido alfanumerico'
    ),
    diaCorte: number()
      .min(1, 'mínimo es 1')
      .max(31, 'máximo es 31')
      .typeError('debe ser un número entero'),
    mesCorte: number()
      .min(1, 'mínimo es 1')
      .max(12, 'máximo es 12')
      .typeError('debe ser un número entero'),
    anioCorte: number()
      .min(2010, 'máximo es 2010')
      .max(2050, 'máximo es 2050')
      .typeError('debe ser un número entero'),
    sector: number('debe ser un numero')
      .integer()
      .min(1, 'mínimo es 1')
      .typeError('debe ser un número entero'),
    origen: number('debe ser un numero')
      .integer()
      .min(1, 'mínimo es 1')
      .typeError('debe ser un número entero'),
    estado: number()
      .integer()
      .min(1, 'mínimo es 1')
      .typeError('debe ser un número entero'),
    entidad: number()
      .integer()
      .min(1, 'mínimo es 1')
      .typeError('debe ser un número entero')
  })
)
