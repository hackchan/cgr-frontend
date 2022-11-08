import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../styles/Login.css'
import { AppContext } from '../contex/AppProvidercContext'
import { useNavigate, Link } from 'react-router-dom'
import { clearMessage } from '../utils/time'
import { Logo } from '../components/Logo'
import { ButtonLoading as Button } from '../components/ButtonLoading'
import { FormLabelStyle } from '../styles/box'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
export const Login = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const { watch, register, handleSubmit, formState: { errors }, clearErrors } = useForm()
  const { login, emailActive } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [blockBtn, setBlockBtn] = useState(false)
  // const clearMessage = async (time = 3000) => {
  //   const timerId = setTimeout(() => setErrorMessage(''), time)
  //   return timerId
  // }

  const handleActiveUser = async () => {
    try {
      const username = watch('username')
      console.log('Username:', username)
      await emailActive(username)
      setErrorMessage('')
      // navigate('/', { replace: true })
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error.message)
      } else {
        setErrorMessage(error.message)
      }
    } finally {
      setLoading(false)
      setBlockBtn(false)
    }
  }

  const onSubmit = async (dataForm) => {
    try {
      await login(dataForm)
      navigate('/', { replace: true })
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error.message)
      } else {
        setErrorMessage(error.message)
      }
    } finally {
      setLoading(false)
      setBlockBtn(false)
    }
  }

  return (
    <div className='box loginbox'>
      <div className='avatar'><Logo big /></div>
      <h2>Iniciar sesión usuario</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} controlId='formGridLatitude'>
            <FormLabelStyle>Username</FormLabelStyle>

            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Usuario o correo' {...register('username', {
                required: {
                  value: true,
                  message: 'El Usuario es requerido'
                }

              })}
            />
            {errors.username && (
              <Form.Text className='errors' onClick={() => clearErrors('username')}>
                {errors.username.message}
              </Form.Text>
            )}

          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId='formGridpassword'>
            <FormLabelStyle>password</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='password' placeholder='' {...register('password', {
                required: {
                  value: true,
                  message: 'La Contraseña es requerida '
                }

              })}
            />
            {errors.password && (
              <Form.Text className='errors' onClick={() => clearErrors('password')}>
                {errors.password.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        {/* USERENAME */}
        {/* <label htmlFor='username'>
          Usuario
          <input
            type='text' placeholder='Usuario o correo' name='username' id='username' {...register('username', {
              required: {
                value: true,
                message: 'El Usuario es requerido '
              },
              pattern: {}
            })}
          />
        </label>
        {errors.username && <span className='errors'>{errors.username.message}</span>}
        <br /> */}
        {/* PASSWORD   */}
        {/* <label htmlFor='password'>
          Contraseña
          <input
            type='password' placeholder='Contraseña' name='password' id='password' {...register('password', {
              required: {
                value: true,
                message: 'La Contraseña es requerida '
              },
              pattern: {}
            })}
          />
        </label> */}

        {/* {errors.password && <span className='errors'>{errors.password.message}</span>} */}
        <div className='loginButton '>
          <Button value='Iniciar sesión' loading={loading} disabled={blockBtn} />
        </div>
        {errorMessage === 'usuario esta inactivo' && <Button value='Enviar email de activacion' loading={loading} disabled={blockBtn} onClick={handleActiveUser} type='button' />}
        {errorMessage && clearMessage(13000, setErrorMessage) && <p><span className='errors'>{errorMessage}</span></p>}
        <div>
          <Link to='/recovery'>Olvidó la contraseña?</Link> <br />
          <Link to='/verify-email'>Crear Cuenta?</Link> <br />

        </div>

      </Form>

    </div>
  )
}
