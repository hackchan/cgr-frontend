import { object, string, number, array } from 'yup'
const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/
export const IESSchema = array().of(
  object({
    codigo: string('debe ser un cadena').matches(
      /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
      'No es un código estudiante válido'
    ),
    semestreReportado: string('debe ser un número')
      .matches(
        /(^(20)[1-9]{1}[0-9]{1}(01|02)$)/,
        'No es un código semestre válido'
      ),

    programa: string('programa')
      .min(3, 'La longitud mínima es de 3 caracteres')
      .max(64, 'La longitud máxima es de 64 caracteres')
      .matches(
        /(^[a-zA-ZÑñ. ]*[a-zA-Z-_Ññ. ]*[a-zA-ZÑñ. ]$)/,
        'No es un programa válido'
      ),

    creditos: number()
      .positive()
      .min(1, 'mínimo  de creditos 1')
      .max(1000, 'máximo de creditos 1000')
      .typeError('debe ser un número entero'),

    tipoDoc: number()
      .integer()
      .min(1, 'mínimo es 1')
      .max(13, 'maximo es 13')
      .typeError('debe ser un número entero'),

    numeroDoc: string('No es un documento válido').matches(
      /^[a-zA-Z0-9]{1,30}$/,
      'Puede ser una cadena de texto y numeros sin espacios'
    ),
    estrato: number()
      .integer()
      .min(1, 'mínimo es 1')
      .max(13, 'maximo es 13')
      .typeError('debe ser un número entero'),

    name: string('debe ser un cadena')
      .trim()
      .min(3, 'longitud mínima de 3 carácteres')
      .max(64, 'longitud máxima de 64 carácteres')
      .matches(
        /(^[a-zA-ZÑñ ]*[a-zA-Z-_Ññ ]*[a-zA-ZÑñ ]$)/,
        'No es un programa válido'
      ),
    sede: number('debe ser un número')
      .integer()
      .min(1, 'debe ser un entero mayor a 0')
      .typeError('debe ser un número entero'),

    residencia: number('debe ser un número')
      .integer()
      .min(1, 'debe ser un entero mayor a 0')
      .typeError('debe ser un número entero'),

    semestreIngreso: string('debe ser un número')
      // .min(6, 'La longitud mínima es de 6 digitos')
      // .max(6, 'La longitud máxima es de 6 digitos')
      .matches(
        /(^(20)[1-9]{1}[0-9]{1}(01|02)$)/,
        'No es un código semestre válido'
      ),

    valorSemestre: number()
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
      .min(0, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),

    recargo: number()
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
      .min(0, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),

    descuentos: number()
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
      .min(0, 'mínimo 0')
      .max(9999999999999.99, 'máximo 9999999999999.99')
      .typeError('debe ser un número entero y si lleva decimal usar el punto'),

    tipoDescuento: string().matches(
      /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]$)/,
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
    entidad: number()
      .integer()
      .min(1, 'mínimo es 1')
      .typeError('debe ser un número entero')
  })
)
