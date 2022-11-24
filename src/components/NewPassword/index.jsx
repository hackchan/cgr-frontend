import React, { useState, useContext } from 'react'
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import { AppContext } from '../../contex/AppProvidercContext'
import { useForm } from 'react-hook-form'
import { ButtonLoading as Button } from '../ButtonLoading'
// import { EyeInvisible, EyeVisible } from './styles'
import { clearMessage, navegateTime } from '../../utils/time'
import { Logo } from '../Logo'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { FormLabelStyle } from '../../styles/box'
export const NewPassword = () => {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password es obligatorio')
      .min(8, 'longitud minima es de 8 caracteres')
      .matches(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.'),
    repassword: Yup.string()
      .required('Confirmacion de password es obligatorio')
      .oneOf([Yup.ref('password')], 'Passwords no coinciden')
  })
  const { changePass } = useContext(AppContext)
  const [messageChange, setmessageChange] = useState('')
  const [message, setMessage] = useState('')
  // const [visible, setVisible] = useState(false)
  // const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [blockBtn, setBlockBtn] = useState(false)
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm(
    {
      mode: 'onTouched',
      reValidateMode: 'onChange',
      resolver: yupResolver(formSchema)

    })
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  // const IconEyePass = visible ? EyeVisible : EyeInvisible
  // const IconEyePassConfirm = visibleConfirm ? EyeVisible : EyeInvisible
  // const password = watch('password')

  const onSubmit = async (dataForm) => {
    try {
      clearMessage(0, setMessage)
      setLoading(true)
      setBlockBtn(true)
      dataForm.token = token
      const response = await changePass(dataForm)
      setmessageChange(response.message)
      navegateTime(3000, navigate, '/login', { msn: response.message })
      // navigate('/login', { replace: true, state: { msn: response.message } })
    } catch (error) {
      setBlockBtn(false)
      if (error.response) {
        setMessage(error.response.data.error.message)
      } else {
        setMessage(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  if (!token) {
    return <Navigate to='/' />
  }
  return (
    <div className='box loginbox'>
      <div className='avatar'><Logo big /></div>
      <h2>Crear una nueva contraseña</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='mb-3'>

          <Form.Group as={Col} controlId='formGridpassword'>
            <FormLabelStyle>password</FormLabelStyle>
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
            <FormLabelStyle>confirmacion password</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='password' placeholder='' {...register('repassword')}
            />
            {errors.repassword && (
              <Form.Text className='errors' onClick={() => clearErrors('repassword')}>
                {errors.repassword.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        {message && clearMessage(3000, setMessage) && <p><span className='errors'>{message}</span></p>}

        <div className='btncenter'>
          <Button value={loading ? 'Espera ⌛...' : 'Cambiar la contraseña '} loading={loading} disabled={blockBtn} />
        </div>
        {messageChange && <p><span className='ok'>{messageChange}</span> </p>}
      </Form>
    </div>
  )
}
