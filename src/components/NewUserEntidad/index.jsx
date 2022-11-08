import React, { useState, useContext } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm } from 'react-hook-form'
import { FormLabelStyle, BoxForm } from '../../styles/box'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppContext } from '../../contex/AppProvidercContext'
import { ModalB } from '../ModalB'
import { formSchema } from './SchemaForm'
import { useLocation, useNavigate } from 'react-router-dom'
export const NewUserEntidad = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [disableBtn, setDisableBtn] = useState(false)
  const [modalShow, setModalShow] = useState(true)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema)
  })
  const {
    state,
    AddUser,
    emailActive

  } = useContext(AppContext)

  const modedark = state.darkMode ? 'dark' : 'light'
  // const theme = createTheme({
  //   palette: {
  //     mode: modedark,
  //     primary: {
  //       main: '#81980f'
  //     },
  //     secondary: {
  //       main: '#00bcd4'
  //     }
  //   }
  // }, esES)

  const handleLogin = () => {
    setModalShow(false)
    navigate('/login', { replace: true })
  }

  const onSubmit = async (dataForm) => {
    try {
      setDisableBtn(true)
      setLoading(true)
      const email = location.state.email
      const entidadId = location.state.entidadId
      const auth = {
        username: dataForm.username,
        password: dataForm.password
      }
      dataForm = {
        name: dataForm.name,
        lastName: dataForm.lastName,
        phone: dataForm.phone,
        email,
        tipo: { id: 2 },
        entidades: [{ id: entidadId }],
        auth,
        roles: [{ id: 2 }]

      }
      console.log('dataform:', dataForm)
      await AddUser(dataForm)
      const response = await emailActive(email)
      console.log('Response:', response)
      setMessage(response.msn)
      // setModalShow(false)
      // navigate('/login', { replace: true })
    } catch (error) {
      setDisableBtn(false)
      if (error.response) {
        setError(error.response.data.error.message)
      } else {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   console.log('location:', location.state)
  //   if (location.state == null) {
  //     navigate('/login', { replace: true })
  //   }
  // }, [])

  return (
    <ModalB show={modalShow} fullscreen={modalShow} animation={false} onHide={() => setModalShow(false)} title={`${location.state.nit} ${location.state.name}`}>
      <BoxForm modedark={modedark}>

        <Form onSubmit={handleSubmit(onSubmit)}>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridNombre'>
              <FormLabelStyle modedark={modedark.toString()}>Username</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='Eje. hackchan' {...register('username')}
              />
              {errors.username && (
                <Form.Text className='errors' onClick={() => clearErrors('username')}>
                  {errors.username.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId='formGridPhone'>
              <FormLabelStyle modedark={modedark.toString()}>Celular</FormLabelStyle>
              <Form.Control
                type='text' placeholder='Eje. 3183895020' {...register('phone')}
              />

              {errors.phone && (
                <Form.Text className='errors' onClick={() => clearErrors('phone')}>
                  {errors.phone.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridNombre'>
              <FormLabelStyle modedark={modedark.toString()}>Nombres</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='Eje. Fabio Antonio' {...register('name')}
              />
              {errors.name && (
                <Form.Text className='errors' onClick={() => clearErrors('name')}>
                  {errors.name.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId='formGridApellido'>
              <FormLabelStyle modedark={modedark.toString()}>Apellidos</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='Eje. Rojas Martha' {...register('lastName', {
                  required: 'apellidos son obligatorios',
                  minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                  maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                  pattern: {
                    value: /(^[a-zA-ZÑñ ]{3,64}$)/,
                    message: 'apellidos no válido'
                  }
                })}
              />
              {errors.lastName && (
                <Form.Text className='errors' onClick={() => clearErrors('lastName')}>
                  {errors.lastName.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridpassword'>
              <FormLabelStyle modedark={modedark.toString()}>password</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='password' placeholder='' {...register('password')}
              />
              {errors.password && (
                <Form.Text className='errors' onClick={() => clearErrors('password')}>
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId='formGridrepassword'>
              <FormLabelStyle modedark={modedark.toString()}>confirmacion password</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='password' placeholder='' {...register('confirmPwd')}
              />
              {errors.confirmPwd && (
                <Form.Text className='errors' onClick={() => clearErrors('confirmPwd')}>
                  {errors.confirmPwd.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <div>
            {message && clearMessage(300000, setMessage) && <p><span className='ok'>{message}</span></p>}
            {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
          </div>
          <br />
          {!message && (
            <div className='d-flex p-2 justify-content-center'>
              <Button modedark={modedark} value={loading ? 'Espere... ⏳' : 'Registar Usuario'} disabled={disableBtn} loading={loading} />
            </div>)}

          {message && (
            <div className='d-flex p-2 justify-content-center'>
              <Button modedark={modedark} value={loading ? 'Espere... ⏳' : 'Login'} onClick={handleLogin} />
            </div>)}

        </Form>
      </BoxForm>
      {/* </div> */}
    </ModalB>
  )
}
