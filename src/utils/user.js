export const isAdmin = (user) => {
  const listaRolesUser = user?.roles.map((rol) => {
    return rol.name
  })

  const isadmin = ['JEDI', 'ADMIN'].some((value) =>
    listaRolesUser?.includes(value)
  )

  return isadmin
}

export const isEntidad = (user) => {
  const listaRolesUser = user?.roles.map((rol) => {
    return rol.name
  })

  const isentidad = ['ENTIDAD'].some((value) =>
    listaRolesUser?.includes(value)
  )

  return isentidad
}

export const isAnalisis = (user) => {
  const listaRolesUser = user?.roles.map((rol) => {
    return rol.name
  })

  const isanalisis = ['ANALISIS'].some((value) => listaRolesUser?.includes(value))

  return isanalisis
}
