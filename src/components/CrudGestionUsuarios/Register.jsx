import React, { useState } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { StyledSelect } from '../../styles/select'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { roRO } from '@mui/material/locale'

// const Input = (props) => <components.Input {...props} isHidden={false} />
export const Register = ({ setModalShow, setReload, preData, AddUser, GetRoles, modedark, GetTypeUsers }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')

  const formSchema = Yup.object().shape({
    tipo: Yup.object().shape().required('Tipo user es obligatorio!'),
    role: Yup.object().shape().required('Role obligatorio'),
    username: Yup.string().min(3, 'Longitud minima es de 3 caracteres').max(64, 'Longitud maxima es de 64 caracteres').matches(/(^[a-zA-Z]+[0-9a-zA-Z_]{3,24}$)/, 'Username no valido, el primer caracter debe ser una letra'),
    name: Yup.string().min(4, 'Longitud minima es de 3 caracteres').max(64, 'Longitud maxima es de 64 caracteres').matches(/(^[a-zA-ZñÑ]+[a-zA-ZñÑ ]{4,64}$)/, 'Nombres no valido'),
    lastName: Yup.string().min(4, 'Longitud minima es de 3 caracteres').max(64, 'Longitud maxima es de 64 caracteres').matches(/(^[a-zA-ZñÑ]+[a-zA-ZñÑ ]{4,64}$)/, 'Apellidos no valido'),
    email: Yup.string().min(3, 'Longitud minima es de 5 caracteres').matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'No es un email válido'),
    phone: Yup.string().min(10, 'Longitud minima y maxima de 10').matches(/^(300|301|302|304|305|324|302|323|304|305|310|311|312|313|314|320|321|322|323|315|316|317|318|319|324|350|351)[0-9]{7}$/, 'No es un numero de celular válido'),
    password: Yup.string()
      .required('Password es obligatorio')
      .min(8, 'longitud minima es de 8 caracteres')
      .matches(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.'),
    confirmPwd: Yup.string()
      .required('Confirmacion de password es obligatorio')
      .oneOf([Yup.ref('password')], 'Passwords no coinciden')
  })
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  const getListTypeUsers = async (inputValue) => {
    const options = []
    const response = await GetTypeUsers()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((tipouser) => {
      options.push({
        label: tipouser.name,
        value: tipouser.id
      })
    })
    return options
  }

  const getRolesList = async (inputValue) => {
    const options = []
    const response = await GetRoles()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((role) => {
      options.push({
        label: role.name,
        value: role.id
      })
    })
    return options
  }

  const onSubmit = async (dataForm) => {
    try {
      console.log('dataForm:', dataForm)
      dataForm = {
        ...dataForm,
        tipo: dataForm.tipo.value,
        auth: { username: dataForm.username, password: dataForm.password, role: [dataForm.role.label] }

      }
      delete dataForm.role
      delete dataForm.confirmPwd
      delete dataForm.username
      delete dataForm.password
      console.log('dataForm2-->>>:', dataForm)
      setDisableBtn(true)
      await AddUser(dataForm)
      setModalShow(false)
      setReload(true)
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
    <BoxForm modedark={modedark}>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridListtipo'>
            <FormLabelStyle modedark={modedark.toString()}>Tipo Usuario</FormLabelStyle>
            <Controller
    // id='department'
              name='tipo'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('tipo')}
                  isClearable
                  classNamePrefix='Select'
      // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListTypeUsers}
        // value={currentDepartment}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.tipo && (
              <Form.Text className='errors' onClick={() => clearErrors('tipo')}>
                {errors.tipo.message}
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

          <Form.Group as={Col} controlId='formGridEmail'>
            <FormLabelStyle modedark={modedark.toString()}>Email</FormLabelStyle>
            <Form.Control
              type='text' placeholder='Eje. fabio.rojas@contraloria.gov.co' {...register('email')}
            />
            {errors.email && (
              <Form.Text className='errors' onClick={() => clearErrors('email')}>
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

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
          <Form.Group as={Col} controlId='formGridListRoles'>
            <FormLabelStyle modedark={modedark.toString()}>Roles</FormLabelStyle>
            <Controller
    // id='department'
              name='role'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('role')}
                  isClearable
                  classNamePrefix='Select'
      // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={getRolesList}
        // value={currentDepartment}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.role && (
              <Form.Text className='errors' onClick={() => clearErrors('role')}>
                {errors.role.message}
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
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='Registrar Usuario' disabled={disableBtn} loading={disableBtn} /></div>
      </Form>
    </BoxForm>
  )
}
