import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Table = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  console.log('marge:', users)

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        setLoading(true)
        const { data, status } = await axios.get('https://jsonplaceholder.typicode.com/users')
        console.log('response:', status)
        if (status < 200 || status > 299) {
          throw new Error('personalizando el error')
        }
        setUsers([...users, ...data])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    obtenerUsuarios()
  }, [])
  const handleUsers = () => {
    const us = {
      id: 12635,
      name: 'Fabio',
      email: 'fabio.mitma@gmail.com',
      website: 'fabio.io'
    }
    setUsers([...users, us])
  }

  const renderRows = () => {
    return users.map((item, idx) => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.website}</td>
        </tr>
      )
    })
  }

  if (loading) {
    return ('loading...')
  }
  if (error && error.length > 0) {
    return <h1>{error}</h1>
  }
  return (
    <div className='margen'>
      <table className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

      <button type='button' onClick={handleUsers}>
        add user
      </button>
    </div>
  )
}
