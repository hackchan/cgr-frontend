import React, { useEffect, useState, useCallback } from 'react'
import { AsyncPaginateStyled } from '../../styles/paginate'

const SelectAsyncProyectos = ({
  entidad,
  GetProyectosByEntidad,
  onChange,
  value,
  register,
  field
}) => {
  const [entidadId, setEntidadId] = useState(null)
  useEffect(() => {
    setEntidadId(entidad)
  }, [entidad])

  const getListProyectosByEntidad = async (search, prevOptions, idEntidad) => {
    if (idEntidad) {
      const options = []
      const response = await GetProyectosByEntidad(idEntidad)
      const filter = response.filter((option) => {
        return option.nombreProyecto
          .toLowerCase()
          .includes(search.toLowerCase())
      })
      filter.forEach((forma) => {
        options.push({
          label: forma.nombreProyecto,
          value: forma.idBpin
        })
      })
      return { options }
    } else return { options: [] }
  }

  const extendedLoadProyectos = useCallback(
    async (search, prevOptions) => {
      const result = await getListProyectosByEntidad(
        search,
        prevOptions,
        entidadId
      )
      return result
    },
    [entidadId]
  )

  // const onChange = (option) => {
  //   if (typeof props.onChange === 'function') {
  //     props.onChange(option)
  //   }
  // }

  return (
    <AsyncPaginateStyled
      // key={JSON.stringify(regionName)}
      {...field}
      isClearable
      classNamePrefix='Select'
      defaultOptions
      value={value || ''}
      loadOptions={extendedLoadProyectos}
      cacheUniqs={[entidadId]}
      getOptionLabel={(e) => e.value + ' ' + e.label}
      getOptionValue={(e) => e.value}
      onChange={onChange}
      isSearchable
      placeholder='Selecciona...'
      additional={{
        page: 1
      }}
    />
  )
}

// SelectAsyncPaginate.propTypes = {
//   regionName: PropTypes.string.isRequired,
//   value: PropTypes.object,
//   onChange: PropTypes.func
// }

export default SelectAsyncProyectos
