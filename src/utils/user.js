export const isAdmin = (user) => {
  const listaRolesUser = user?.roles.map((rol) => {
    return rol.name
  })

  console.log('listaRoles:', listaRolesUser)
  const isadmin = ['JEDI', 'ADMIN'].some((value) =>
    listaRolesUser?.includes(value)
  )
  console.log('isadmin:', isadmin)
  return isadmin
}
