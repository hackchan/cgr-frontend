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
import { formSchema } from './Schema'
// import { UploadAvatar } from '../UploadAvatar'
// const Input = (props) => <components.Input {...props} isHidden={false} />
export const Register = ({ setModalShow, setReload, preData, AddUser, GetRoles, GetEntidad, modedark, GetTypeUsers, getDepartments }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [entidades, setEntidades] = useState([])

  // const [imgBase64, setImgBase64] = useState('')
  const handleEntidades = (entidad) => {
    setEntidades(entidad)
  }
  const handleDepartamentos = (departments) => {
    const listaEntidades = []
    if (departments?.length > 0) {
      for (const depart of departments) {
        for (const muni of depart.municipios) {
          for (const enti of muni.entidades) {
            listaEntidades.push({ label: enti.name, value: enti.id })
          }
        }
      }
      handleEntidades(listaEntidades)
    } else {
      handleEntidades([])
    }
  }
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  const validateUserEntity = (tipo, roles, entidades) => {
    if (tipo === 'ENTIDAD') {
      if (roles.length > 1) {
        throw new Error('Solo se permite asignar un rol al tipo usuario entidad')
      }
      if (roles.length === 1) {
        if (roles[0].name !== tipo) {
          throw new Error('El unico rol permitido para un usuario de tipo entidad es ENTIDAD')
        }
      }
      if (entidades.length > 1) {
        throw new Error('Solo se permite asignar una ENTIDAD al tipo usuario entidad')
      }
    } else {
      if (entidades.length === 0) {
        throw new Error('Debe seleccionar las entidades que el usuario sera responsable')
      }
    }
  }
  const getListaDepartamentos = async (inputValue) => {
    const options = []
    const response = await getDepartments(null)
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((department) => {
      options.push({
        label: department.name,
        value: department.id,
        municipios: department.municipios
      })
    })
    return options
  }
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

  const getListEntidades = async (inputValue) => {
    const options = []
    const response = await GetEntidad()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((entidad) => {
      options.push({
        label: entidad.name,
        value: entidad.id
      })
    })
    return options
  }

  const onSubmit = async (dataForm) => {
    try {
      console.log('entidadesd:', entidades)
      const roles = dataForm.roles.map((role) => {
        return { name: role.label, id: role.value }
      })
      const entidadesC = entidades.map((entidad) => {
        return { name: entidad.label, id: entidad.value }
      })

      validateUserEntity(dataForm.tipo.label, roles, entidadesC)

      dataForm = {
        ...dataForm,
        tipo: { id: dataForm.tipo.value, name: dataForm.tipo.label },
        auth: { username: dataForm.username, password: dataForm.password },
        roles,
        entidades: entidadesC
      }
      console.log('dataForm:', dataForm)
      if (dataForm.image === null) {
        delete dataForm.image
      }
      delete dataForm.role
      delete dataForm.confirmPwd
      delete dataForm.username
      delete dataForm.password
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
        {/* <Row className='mb-3'>
          <Form.Group as={Col} controlId='formImage'>
            <FormLabelStyle modedark={modedark.toString()}>Avatar</FormLabelStyle>
            <Controller
    // id='department'
              name='image'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <UploadAvatar setImgBase64={setImgBase64} />
              )}
            />
            {errors.image && (
              <Form.Text className='errors' onClick={() => clearErrors('image')}>
                {errors.image.message}
              </Form.Text>
            )}

          </Form.Group>

        </Row> */}

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
                  // value={tipoUser}
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

          <Form.Group as={Col} controlId='formGridListRoles'>
            <FormLabelStyle modedark={modedark.toString()}>Roles</FormLabelStyle>
            <Controller
              name='roles'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('roles')}
                  isMulti
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  loadOptions={getRolesList}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.roles && (
              <Form.Text className='errors' onClick={() => clearErrors('roles')}>
                {errors.roles.message}
              </Form.Text>
            )}

          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridDepartment'>
            <FormLabelStyle modedark={modedark.toString()}>Departamento</FormLabelStyle>
            <Controller
              // id='department'
              name='department'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  isMulti
                  innerRef={ref}
                  {...register('department', { required: 'Departamento es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={getListaDepartamentos}
                  // value={currentDepartment}
                  onChange={(e) => { onChange(e); handleDepartamentos(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.department && (
              <Form.Text className='errors' onClick={() => clearErrors('department')}>
                {errors.department.message}
              </Form.Text>
            )}

          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridListEntidades'>
            <FormLabelStyle modedark={modedark.toString()}>Entidades</FormLabelStyle>
            <Controller
              defaultValue={entidades}
              name='entidades'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('entidades')}
                  isMulti
                  isClearable={false}
                  defaultOptions
                  value={entidades}
                  placeholder='Selecciona...'
                  loadOptions={getListEntidades}
                  onChange={(e) => { onChange(e); handleEntidades(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.entidades && (
              <Form.Text className='errors' onClick={() => clearErrors('entidades')}>
                {errors.entidades.message}
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
