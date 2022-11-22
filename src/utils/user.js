export const isAdmin = (user) => {
  const listaRolesUser = user?.roles.map((rol) => {
    return rol.name
  })

  const isadmin = ['JEDI', 'ADMIN'].some((value) =>
    listaRolesUser?.includes(value)
  )

  return isadmin
}
