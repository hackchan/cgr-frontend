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
import { FormCheckStyle, ContainerSwitch } from '../../styles/Check'

// const Input = (props) => <components.Input {...props} isHidden={false} />
export const Update = ({ setModalUpdateShow, setReload, data, UpdateEmail, GetEntidad, modedark }) => {
  const [registerEmail, setRegisterEmail] = useState(data.register)
  const [entidadSel, setEntidadSel] = useState({ label: data.entidad.name, value: data.entidad.id })
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')

  const formSchema = Yup.object().shape({

    entidad: Yup.object().shape().required('Entidad es obligatorio'),
    email: Yup.string().min(3, 'Longitud minima es de 5 caracteres').matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'No es un email válido')

  })
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: data.email,
      register: data.register

    }

  })

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
  const handleInputRegisterChange = () => {
    setRegisterEmail(!registerEmail)
  }
  const onSubmit = async (dataForm) => {
    try {
      dataForm = { ...dataForm, entidad: dataForm.entidad.value }
      console.log('dataForm2-->>>:', dataForm)
      setDisableBtn(true)
      await UpdateEmail(dataForm, data.id)
      setModalUpdateShow(false)
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
          <ContainerSwitch>
            <Form.Group as={Col} controlId='formGridCapital'>
              <FormCheckStyle
                checked={registerEmail}
                id='switch-1'
                type='switch'
                label='Crear Usuario'
                onChange={handleInputRegisterChange}
                modedark={modedark.toString()}
              />
            </Form.Group>

          </ContainerSwitch>

        </Row>

        <Row className='mb-3'>

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
          <Form.Group as={Col} controlId='formGridListEntidades'>
            <FormLabelStyle modedark={modedark.toString()}>Entidad</FormLabelStyle>
            <Controller
              defaultValue={entidadSel}
              name='entidad'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  value={entidadSel}
                  {...field}
                  innerRef={ref}
                  {...register('entidad')}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  loadOptions={getListEntidades}
                  onChange={(e) => { onChange(e); setEntidadSel(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.entidad && (
              <Form.Text className='errors' onClick={() => clearErrors('entidad')}>
                {errors.entidad.message}
              </Form.Text>
            )}

          </Form.Group>
        </Row>

        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='📧 Actializar Email' disabled={disableBtn} loading={disableBtn} /></div>
      </Form>
    </BoxForm>
  )
}
