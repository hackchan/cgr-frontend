import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
// import Button from 'react-bootstrap/Button'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { FormCheckStyle, ContainerSwitch } from '../../styles/Check'
import { StyledSelect } from '../../styles/select'

import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'

import { Logo } from '../Logo'

export const Update = ({ setModal, setReload, preData, data, getDepartments, getTipoMunicipios, UpdateMunicipio, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [currentDepartment, setcurrentDepartment] = useState({ value: data.divipola.slice(0, 2) })
  const [currentTipo, setcurrentTipo] = useState({ label: data.tipo.name, value: data.tipo.id })
  const [departmentSel, setDepartmentSel] = useState({ label: data.department.name, value: data.department.id })

  const [activo, setActivo] = useState(data.active)
  const [capital, setCapital] = useState(data.isCapital)
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: data.name,
      divipola: data.divipola.slice(2),
      latitude: data.latitude,
      longitude: data.longitude

    }
  })

  const handleInputActivoChange = () => {
    setActivo(!activo)
  }
  const handleInputCapitalChange = () => {
    setCapital(!capital)
  }

  const loadOptions = async (inputValue) => {
    const options = []
    const response = await getDepartments(null)
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((department) => {
      options.push({
        label: department.name,
        value: department.id
      })
    })
    return options
  }

  const loadOptionsTipos = async (inputValue) => {
    const options = []
    const response = await getTipoMunicipios()
    const filter = response.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((department) => {
      options.push({
        label: department.name,
        value: department.id
      })
    })
    return options
  }
  const onSubmit = async (dataForm) => {
    try {
      dataForm.id = data.id
      dataForm = { ...dataForm, divipola: currentDepartment.value.toString().padStart(2, '0') + dataForm.divipola, isCapital: capital, active: activo, department: dataForm.department.value, tipo: dataForm.tipo.value }
      setDisableBtn(true)
      console.log('dataForm FINAL:', dataForm)
      await UpdateMunicipio(dataForm)
      setModal(false)
      setReload(true)
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error.message)
      } else {
        setError(error.message)
      }
      // setError(error.message)
    } finally {
      setDisableBtn(false)
    }
  }
  return (
    <BoxForm modedark={modedark}>
      <div className='avatar'><Logo big /></div>
      <h2>{preData.update}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='mb-3'>
          <ContainerSwitch>
            <Form.Group as={Col} controlId='formGridCapital'>
              <FormCheckStyle
                checked={capital}
                id='switch-1'
                type='switch'
                label='Capital'
                onChange={handleInputCapitalChange}
                modedark={modedark.toString()}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridActivo'>
              <FormCheckStyle
                checked={activo}
                id='switch-2'
                type='switch'
                label='Activo'
                onChange={handleInputActivoChange}
                modedark={modedark.toString()}
              />
            </Form.Group>
          </ContainerSwitch>

        </Row>
        <div className='divider' />
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridName'>
            <FormLabelStyle modedark={modedark.toString()}>Municipio</FormLabelStyle>
            <Form.Control style={{ height: 38 }} type='text' placeholder='Nombre del municipio' {...register('name', { required: 'Municipio es obligatorio' })} />

            {errors.name && (
              <Form.Text className='errors' onClick={() => clearErrors('name')}>
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridDepartment'>
            <FormLabelStyle modedark={modedark.toString()}>Departamento</FormLabelStyle>
            <Controller
              // id='department'
              defaultValue={departmentSel}
              name='department'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('department', { required: 'Departamento es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                  placeholder='Selecciona...'
                  defaultOptions
                  loadOptions={loadOptions}
                  value={departmentSel}
                  onChange={(e) => { onChange(e); setcurrentDepartment(e); setDepartmentSel(e) }}
                  onBlur={onBlur}

                  // onChange={e => setSelected(e)}
                  // onInputChange={handleInputChange}
                  // closeMenuOnSelect

                />
              )}
            />
            {errors.department && (
              <Form.Text className='errors' onClick={() => clearErrors('department')}>
                {errors.department.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGridTipo'>
            <FormLabelStyle modedark={modedark.toString()}>Tipo</FormLabelStyle>
            <Controller
              // id='department'
              defaultValue={currentTipo}
              name='tipo'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('tipo', { required: 'tipo es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={loadOptionsTipos}
                  value={currentTipo}
                  onChange={(e) => { onChange(e); setcurrentTipo(e) }}
                  onBlur={onBlur}
                  // onChange={e => setSelected(e)}
                  // onInputChange={handleInputChange}
                  // closeMenuOnSelect

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
          <Form.Group as={Col} controlId='formGridDivipola'>
            <FormLabelStyle modedark={modedark.toString()}>Divipola</FormLabelStyle>
            <InputGroup>
              <InputGroup.Text id='basic-addon1'>{currentDepartment?.value?.toString().padStart(2, '0')}</InputGroup.Text>
              <Form.Control
                style={{ height: 38 }} type='number' placeholder='eje. 05432' {...register('divipola', {
                  required: 'Divipola es obligatorio',
                  pattern: {
                    value: /^([0-9]{3,5})$/,
                    message: 'No es un código divipola válido'
                  }
                })}
              />

            </InputGroup>
            {errors.divipola && (
              <Form.Text className='errors' onClick={() => clearErrors('divipola')}>
                {errors.divipola.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridLatitude'>
            <FormLabelStyle modedark={modedark.toString()}>Latitude</FormLabelStyle>

            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. 4.60971' {...register('latitude', {
                required: {
                  value: true,
                  message: 'La latitude es requerida'
                },
                pattern: {
                  value: /^[-+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/i,
                  message: 'No es un latitud válida'
                }

              })}
            />
            {errors.latitude && (
              <Form.Text className='errors' onClick={() => clearErrors('latitude')}>
                {errors.latitude.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGridLongitude'>
            <FormLabelStyle modedark={modedark.toString()}>Longitude</FormLabelStyle>

            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. -74.08175' {...register('longitude', {
                required: {
                  value: true,
                  message: 'La longitud es requerida'
                },
                pattern: {
                  value: /^[-+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/i,
                  message: 'No es un longitud válida'
                }
              })}
            />
            {errors.longitude && (
              <Form.Text className='errors' onClick={() => clearErrors('longitude')}>
                {errors.longitude.message}
              </Form.Text>
            )}

          </Form.Group>

        </Row>
        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <Button modedark={modedark} value={preData.update} disabled={disableBtn} loading={disableBtn} />
        {/* <Button variant='primary' type='submit'>
          Submit
        </Button> */}
      </Form>
    </BoxForm>
  )
}
