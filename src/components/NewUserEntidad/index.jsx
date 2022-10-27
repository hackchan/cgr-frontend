import React, { useState, useContext, useRef } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm } from 'react-hook-form'
import { FormLabelStyle, BoxForm } from '../../styles/box'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { AppContext } from '../../contex/AppProvidercContext'
import { ModalB } from '../ModalB'
import { Spinner } from '../Spinner'

export const NewUserEntidad = () => {
  const emailImput = useRef(null)
  const formSchema = Yup.object().shape({
    // tipo: Yup.object().shape().required('Tipo user es obligatorio!'),
    // role: Yup.object().shape().required('Role obligatorio'),
    // image: Yup.string(),
    username: Yup.string().min(3, 'Longitud minima es de 3 caracteres').max(64, 'Longitud maxima es de 64 caracteres').matches(/(^[a-zA-Z]+[0-9a-zA-Z_]{3,24}$)/, 'Username no valido, el primer caracter debe ser una letra'),
    name: Yup.string().min(4, 'Longitud minima es de 3 caracteres').max(64, 'Longitud maxima es de 64 caracteres').matches(/(^[a-zA-ZñÑ]+[a-zA-ZñÑ ]{4,64}$)/, 'Nombres no valido'),
    lastName: Yup.string().min(4, 'Longitud minima es de 3 caracteres').max(64, 'Longitud maxima es de 64 caracteres').matches(/(^[a-zA-ZñÑ]+[a-zA-ZñÑ ]{4,64}$)/, 'Apellidos no valido'),
    email: Yup.string().matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'No es un email válido'),
    phone: Yup.string().min(10, 'Longitud minima y maxima de 10').matches(/^(300|301|302|304|305|324|302|323|304|305|310|311|312|313|314|320|321|322|323|315|316|317|318|319|324|350|351)[0-9]{7}$/, 'No es un numero de celular válido'),
    password: Yup.string()
      .required('Password es obligatorio')
      .min(8, 'longitud minima es de 8 caracteres')
      .matches(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/, 'La contraseña: Longitud entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.'),
    confirmPwd: Yup.string()
      .required('Confirmacion de password es obligatorio')
      .oneOf([Yup.ref('password')], 'Passwords no coinciden')
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalShow, setModalShow] = useState(true)
  const [disableForm, setDisableForm] = useState(true)
  const [disableBtn, setDisableBtn] = useState(true)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema)
  })
  const {
    state,
    validateEmail
  } = useContext(AppContext)
  const dopEmail = register('email')
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
  const onValidateEmail = async (e) => {
    try {
      console.log('on validate ...')
      console.log('ref:', emailImput)
      clearMessage(0, setMessage)
      setLoading(true)

      // await validateEmail(dataForm)
      // setMessage(data.msn)
      // navigate('/newuser-entidad', { replace: true, state: { msn: data.msn } })
    } catch (error) {
      try {
        if (error.response.data) {
          setMessage(error.response.data.error.message)
        } else if (error.request.data) {
          console.log('error request :(')
          setMessage(error.request.data.error.message)
        } else {
          console.log('homero error:', error.message)
          setMessage(error.message)
        }
      } catch (error) {
        setMessage(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  const onSubmit = async (dataForm) => {
    try {
      // dataForm = {
      //   ...dataForm,
      //   diaCorte: Number(dataForm.diaCorte),
      //   mesCorte: Number(dataForm.mesCorte),
      //   anioCorte: Number(dataForm.anioCorte),
      //   entidad: dataForm.entidad.value,
      //   estado: dataForm.estado.value,
      //   origen: dataForm.origen.value,
      //   sector: dataForm.sector.value,
      //   valorTotalAdiciones: Number(dataForm.valorTotalAdiciones),
      //   valorComprometido: Number(dataForm.valorComprometido),
      //   valorObligado: Number(dataForm.valorObligado),
      //   valorPagado: Number(dataForm.valorPagado),
      //   valorAnticipo: Number(dataForm.valorAnticipo),
      //   cantidadSuspenciones: Number(dataForm.cantidadSuspenciones),
      //   cantidadProrrogas: Number(dataForm.cantidadProrrogas),
      //   tiempoSuspenciones: Number(dataForm.tiempoSuspenciones),
      //   tiempoProrrogas: Number(dataForm.tiempoProrrogas),
      //   cantidadAdiciones: Number(dataForm.cantidadAdiciones),
      //   valorContratoInicial: Number(dataForm.valorContratoInicial),
      //   valorContratoFinal: Number(dataForm.valorContratoFinal),
      //   avanceFisicoProgramado: Number(dataForm.avanceFisicoProgramado),
      //   avanceFisicoEjecutado: Number(dataForm.avanceFisicoEjecutado),
      //   avanceFinancieroEjecutado: Number(dataForm.avanceFinancieroEjecutado),
      //   municipioObra: municipioSel.value

      // }
      // delete dataForm.departamentoObra
      console.log('dataForm2:', dataForm)
      setDisableBtn(true)
      // await AddMatrizObra([dataForm])
      // setModalShow(false)
      // setReload(true)
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error.message)
      } else {
        setError(error.message)
      }
    } finally {
      setDisableBtn(false)
    }
  }
  return (
    <ModalB show={modalShow} fullscreen={modalShow} animation={false} onHide={() => setModalShow(false)} title='Registrar Usuario'>
      <BoxForm modedark={modedark}>
        {/* <div className='box'>
        <div className='avatar'><Logo big /></div>
        <h2>Registrar Usuario</h2> */}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group as={Col} controlId='formGridEmail'>
              <FormLabelStyle modedark={modedark.toString()}>Email</FormLabelStyle>
              <Form.Control
                type='text' placeholder='Eje. fabio.rojas@contraloria.gov.co' {...dopEmail} ref={(e) => {
                  dopEmail.ref(e)
                  emailImput.current = e
                }} {...register('email')}
              />
              {errors.email && (
                <Form.Text className='errors' onClick={() => clearErrors('email')}>
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>

          </Row>
          <Row>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Button
                value='Verificar Email'
                onClick={onValidateEmail}
                type='button'
                className='danger'
                disabled={loading}
                loading={loading}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridNombre'>
              <FormLabelStyle modedark={modedark.toString()}>Username</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='Eje. hackchan' disabled={disableForm} {...register('username')}
              />
              {errors.username && (
                <Form.Text className='errors' onClick={() => clearErrors('username')}>
                  {errors.username.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridNombre'>
              <FormLabelStyle modedark={modedark.toString()}>Nombres</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='Eje. Fabio Antonio' disabled={disableForm} {...register('name')}
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
                style={{ height: 38 }} type='text' placeholder='Eje. Rojas Martha' disabled={disableForm} {...register('lastName', {
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

            <Form.Group as={Col} controlId='formGridPhone'>
              <FormLabelStyle modedark={modedark.toString()}>Celular</FormLabelStyle>
              <Form.Control
                type='text' placeholder='Eje. 3183895020' disabled={disableForm} {...register('phone')}
              />

              {errors.phone && (
                <Form.Text className='errors' onClick={() => clearErrors('phone')}>
                  {errors.phone.message}
                </Form.Text>
              )}
            </Form.Group>

          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridpassword'>
              <FormLabelStyle modedark={modedark.toString()}>password</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='password' placeholder='' disabled={disableForm} {...register('password')}
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
                style={{ height: 38 }} type='password' placeholder='' disabled={disableForm} {...register('confirmPwd')}
              />
              {errors.confirmPwd && (
                <Form.Text className='errors' onClick={() => clearErrors('confirmPwd')}>
                  {errors.confirmPwd.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <div>
            {loading && <Spinner />}
            {message && clearMessage(30000, setMessage) && <p><span className='errors'>{message}</span></p>}
            {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
          </div>
          <br />
          <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='Registar Usuario' disabled={disableBtn} loading={false} /></div>
        </Form>
      </BoxForm>
      {/* </div> */}
    </ModalB>
  )
}
