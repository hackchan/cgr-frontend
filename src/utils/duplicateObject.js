export function eliminarObjetosDuplicados (arr, prop) {
  const nuevoArray = []
  const lookup = {}

  for (const i in arr) {
    lookup[arr[i][prop]] = arr[i]
  }

  for (const i in lookup) {
    nuevoArray.push(lookup[i])
  }

  return nuevoArray
}
