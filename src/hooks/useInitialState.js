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
    payload = null,
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
    UpdateTipoMunicipios
  }
}
