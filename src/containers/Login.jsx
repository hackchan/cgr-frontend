import React from 'react'
import { useForm } from 'react-hook-form'
export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)
  return (
    <div className='login-box'>
      <img src='https://i.ibb.co/fvZ0bL9/logo-cgr.png' alt='cgr' />
      <h1>Login in to Analizer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* USERENAME */}
        <label htmlFor='username'>
          Useraname
          <input
            type='text' placeholder='Full Name' name='username' id='username' {...register('username', {
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
        <label htmlFor='username'>
          Useraname
          <input
            type='text' placeholder='Full Name' name='username' id='username' {...register('username', {
              required: {
                value: true,
                message: 'el campo es requerido'
              },
              pattern: {}
            })}
          />
        </label>
        {errors.username && <span>{errors.username.message}</span>}
      </form>
    </div>
  )
}
