import * as Yup from 'yup'

export const formSchema = Yup.object().shape({
  tipo: Yup.object().shape().required('Tipo user es obligatorio!'),
  roles: Yup.array()
    .min(1, 'Debe seleccionar al menos un rol')
    .required('Roles es obligatorio')
    .of(Yup.object().shape()),
  entidades: Yup.array()
    .min(1, 'Debe seleccionar al menos una entidad')
    .required('Entidades es obligatorio')
    .of(Yup.object().shape()),
  image: Yup.string(),
  username: Yup.string()
    .min(3, 'Longitud minima es de 3 caracteres')
    .max(64, 'Longitud maxima es de 64 caracteres')
    .matches(
      /(^[a-zA-Z]+[0-9a-zA-Z_]{3,24}$)/,
      'Username no valido, el primer caracter debe ser una letra'
    ),
  name: Yup.string()
    .min(4, 'Longitud minima es de 3 caracteres')
    .max(64, 'Longitud maxima es de 64 caracteres')
    .matches(/(^[a-zA-ZñÑ]+[a-zA-ZñÑ ]{4,64}$)/, 'Nombres no valido'),
  lastName: Yup.string()
    .min(4, 'Longitud minima es de 3 caracteres')
    .max(64, 'Longitud maxima es de 64 caracteres')
    .matches(/(^[a-zA-ZñÑ]+[a-zA-ZñÑ ]{4,64}$)/, 'Apellidos no valido'),
  email: Yup.string()
    .min(3, 'Longitud minima es de 5 caracteres')
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      'No es un email válido'
    ),
  phone: Yup.string()
    .min(10, 'Longitud minima y maxima de 10')
    .matches(
      /^(300|301|302|304|305|324|302|323|304|305|310|311|312|313|314|320|321|322|323|315|316|317|318|319|324|350|351)[0-9]{7}$/,
      'No es un numero de celular válido'
    ),
  password: Yup.string()
    .required('Password es obligatorio')
    .min(8, 'longitud minima es de 8 caracteres')
    .matches(
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
      'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.'
    ),
  confirmPwd: Yup.string()
    .required('Confirmacion de password es obligatorio')
    .oneOf([Yup.ref('password')], 'Passwords no coinciden')
})

export const formSchemaAdmin = Yup.object().shape({
  image: Yup.string(),
  name: Yup.string()
    .min(4, 'Longitud minima es de 3 caracteres')
    .max(64, 'Longitud maxima es de 64 caracteres')
    .matches(/(^[a-zA-ZñÑ]+[a-zA-ZñÑ ]{4,64}$)/, 'Nombres no valido'),
  lastName: Yup.string()
    .min(4, 'Longitud minima es de 3 caracteres')
    .max(64, 'Longitud maxima es de 64 caracteres')
    .matches(/(^[a-zA-ZñÑ]+[a-zA-ZñÑ ]{4,64}$)/, 'Apellidos no valido'),
  email: Yup.string()
    .min(3, 'Longitud minima es de 5 caracteres')
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      'No es un email válido'
    ),
  phone: Yup.string()
    .min(10, 'Longitud minima y maxima de 10')
    .matches(
      /^(300|301|302|304|305|324|302|323|304|305|310|311|312|313|314|320|321|322|323|315|316|317|318|319|324|350|351)[0-9]{7}$/,
      'No es un numero de celular válido'
    )
})
