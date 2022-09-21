import { useState } from 'react'
import initialState from '../initialState'
import axios from 'axios'
import { useLocalStorage } from './useLocalStorage'
export const useInitialState = () => {
  const [state, setState] = useState(initialState)
  const [auth, setAuth] = useLocalStorage('user', null)
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  const changePass = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/login/change-password',
        data: {
          token: payload.token,
          newPassword: payload.password
        },
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const recovery = async (payload) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/login/recovery',
        data: {
          email: payload.email
        },
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  const login = async (payload) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/login',
        data: {
          username: payload.username,
          password: payload.password
        },
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })
      const { body } = response.data

      const user = {
        id: body.user.id,
        image: body.user.image,
        username: body.user.auth.username,
        token: body.token
      }

      setAuth(user)
      setState({
        ...state,
        user
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  // Crud satelitales

  const getSatelitales = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3010/api/v2/satelital',
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddSatelitales = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/satelital',
        data: { name: payload.satelital },
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteSatelital = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/satelital/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateSatelitales = async (payload) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/satelital/${payload.id}`,
        data: { name: payload.name },
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Departamento

  const getDepartments = async (
    payload,
    globalFilter,
    columnFilters,
    sorting
  ) => {
    try {
      const url = new URL('/api/v2/department', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddDepartment = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/department',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteDepartment = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/department/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateDepartment = async (payload) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/department/${payload.id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Municipios
  const getMunicipios = async (
    payload,
    globalFilter,
    columnFilters,
    sorting
  ) => {
    try {
      console.log('payload:', payload)
      const url = new URL('/api/v2/municipio', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))
      console.log('URL:', url.href)
      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddMunicipio = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/municipio',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteMunicipio = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/municipio/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateMunicipio = async (payload) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/municipio/${payload.id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud tipo Municipio
  const getTipoMunicipios = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3010/api/v2/municipio-types',
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  const AddTipoMunicipios = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/municipio-types',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteTipoMunicipios = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/municipio-types/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateTipoMunicipios = async (payload) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/municipio-types/${payload.id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Categorias
  const getCategorias = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3010/api/v2/categoria',
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddCategorias = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/categoria',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteCategoria = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/categoria/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateCategoria = async (payload, id) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/categoria/${id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  // Crud sector
  const getSector = async (payload, globalFilter, columnFilters, sorting) => {
    try {
      console.log('payload:', payload)
      const url = new URL('/api/v2/sector', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddSector = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/sector',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteSector = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/sector/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateSector = async (payload, id) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/sector/${id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Subsector
  const getSubSector = async (
    payload,
    globalFilter,
    columnFilters,
    sorting
  ) => {
    try {
      console.log('payload:', payload)
      const url = new URL('/api/v2/subsector', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddSubSector = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/subsector',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteSubSector = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/subsector/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateSubSector = async (payload, id) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/subsector/${id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Gestion Usuario
  const GetUserCGR = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3010/api/v2/users/cgr',
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  // Crud Entidad
  const GetEntidad = async (payload, globalFilter, columnFilters, sorting) => {
    try {
      console.log('payload:', payload)
      const url = new URL('/api/v2/entidad', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddEntidad = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/entidad',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteEntidad = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/entidad/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  const UpdateEntidad = async (payload, id) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/entidad/${id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Estado Obra
  const GetEstadoObra = async (
    payload,
    globalFilter,
    columnFilters,
    sorting
  ) => {
    try {
      console.log('payload:', payload)
      const url = new URL('/api/v2/estado-obra', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddEstadoObra = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/estado-obra',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteEstadoObra = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/estado-obra/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateEstadoObra = async (payload, id) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/estado-obra/${id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Sector Obra
  const GetSectorObra = async (
    payload,
    globalFilter,
    columnFilters,
    sorting
  ) => {
    try {
      console.log('payload:', payload)
      const url = new URL('/api/v2/sector-obra', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddSectorObra = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/sector-obra',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteSectorObra = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/sector-obra/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateSectorObra = async (payload, id) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/sector-obra/${id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Origen Recurso
  const GetOrigenRecursoObra = async (
    payload,
    globalFilter,
    columnFilters,
    sorting
  ) => {
    try {
      console.log('payload:', payload)
      const url = new URL('/api/v2/origen-recurso', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddOrigenRecursoObra = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/origen-recurso',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteOrigenRecursoObra = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/origen-recurso/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateOrigenRecursoObra = async (payload, id) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/origen-recurso/${id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Crud Matriz Obra
  const GetMatrizObras = async (
    payload,
    globalFilter,
    columnFilters,
    sorting
  ) => {
    try {
      console.log('payload:', payload)
      const url = new URL('/api/v2/obra', 'http://localhost:3010')
      if (payload) {
        url.searchParams.set('take', `${payload.pageSize}`)
        url.searchParams.set('skip', `${payload.pageIndex * payload.pageSize}`)
      }

      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await axios({
        method: 'get',
        url: url.href,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const AddMatrizObra = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3010/api/v2/obra',
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const DeleteMatrizObra = async (payload) => {
    try {
      console.log('payload:', payload)
      const response = await axios({
        method: 'delete',
        url: `http://localhost:3010/api/v2/obra/${payload.id}`,
        data: {},
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const UpdateMatrizObra = async (payload, id) => {
    try {
      console.log('payload update:', payload)
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3010/api/v2/obra/${id}`,
        data: payload,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' }
      })

      const { body, status } = response.data
      console.log('status:', status)
      return body
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const chgDarkMode = (mode = false) => {
    setDarkMode(mode)
    setState({
      ...state,
      darkMode: mode
    })
  }
  const checkDarkMode = () => {
    if (darkMode) {
      setState({
        ...state,
        darkMode
      })
    }

    return darkMode
  }

  const checkSession = () => {
    if (auth) {
      setState({
        ...state,
        user: auth
      })
    }
    return auth
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setState({
      ...state,
      user: null
    })
  }
  const addToCart = (payload) => {
    setState({
      ...state,
      cart: [...state.cart, payload]
    })
  }

  const removeToCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((items) => items.id !== payload.id)
    })
  }
  return {
    login,
    recovery,
    logout,
    checkSession,
    chgDarkMode,
    checkDarkMode,
    addToCart,
    removeToCart,
    state,
    changePass,
    getSatelitales,
    AddSatelitales,
    DeleteSatelital,
    UpdateSatelitales,
    getDepartments,
    AddDepartment,
    DeleteDepartment,
    UpdateDepartment,
    getMunicipios,
    AddMunicipio,
    DeleteMunicipio,
    UpdateMunicipio,
    getTipoMunicipios,
    AddTipoMunicipios,
    DeleteTipoMunicipios,
    UpdateTipoMunicipios,
    getCategorias,
    AddCategorias,
    UpdateCategoria,
    DeleteCategoria,
    getSector,
    AddSector,
    DeleteSector,
    UpdateSector,
    getSubSector,
    AddSubSector,
    DeleteSubSector,
    UpdateSubSector,
    GetUserCGR,
    GetEntidad,
    AddEntidad,
    DeleteEntidad,
    UpdateEntidad,
    GetEstadoObra,
    AddEstadoObra,
    DeleteEstadoObra,
    UpdateEstadoObra,
    GetSectorObra,
    AddSectorObra,
    DeleteSectorObra,
    UpdateSectorObra,
    GetOrigenRecursoObra,
    AddOrigenRecursoObra,
    DeleteOrigenRecursoObra,
    UpdateOrigenRecursoObra,
    GetMatrizObras,
    DeleteMatrizObra,
    AddMatrizObra,
    UpdateMatrizObra
  }
}
