import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../contex/AppProvidercContext'
import { eliminarObjetosDuplicados } from '../utils/duplicateObject'
export function useDepartments (entidades) {
  const { GetMunicipiosByDepartment } = useContext(AppContext)
  // const [error, setError] = useState('')
  // const [isError, setIsError] = useState(false)
  const [departamentos, setDepartamentos] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departs = []
        const departsMuni = []
        for (const entidad of entidades) {
          departs.push({ label: entidad.municipio.department.name, value: entidad.municipio.department.id })
        }
        const departFilter = eliminarObjetosDuplicados(departs, 'value')
        for (const depart of departFilter) {
          const municipios = await GetMunicipiosByDepartment(depart.value)
          depart.municipios = municipios.data
          departsMuni.push(depart)
        }
        setDepartamentos(departsMuni)
      } catch (error) {
        return []
      }
    }

    // call the function
    fetchData()
  }, [])

  return [departamentos, setDepartamentos]
}
