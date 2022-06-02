import React from 'react'
import { useForm } from 'react-hook-form'
import '../styles/Login.css'
export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)
  return (
    <div className='loginbox'>
      <img className='avatar' src='https://i.ibb.co/fvZ0bL9/logo-cgr.png' alt='cgr' />
      <h1>Login in to Analizer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* USERENAME */}
        <label htmlFor='username'>
          Useraname
          <input
            type='text' placeholder='Username' name='username' id='username' {...register('username', {
              required: {
                value: true,
                message: 'el campo es requerido'
              },
              pattern: {}
            })}
          />
        </label>
        {errors.username && <span>{errors.username.message}</span>}

        {/* PASSWORD   */}
        <label htmlFor='password'>
          Password
          <input
            type='password' placeholder='Contraseña' name='password' id='password' {...register('password', {
              required: {
                value: true,
                message: 'el campo es requerido'
              },
              pattern: {}
            })}
          />
        </label>
        {errors.username && <span>{errors.username.message}</span>}
        <input type='submit' value='Sign in' />
        <a href='#'>lost your password</a>
        <a href='#'>Register</a>
      </form>
    </div>
  )
}
