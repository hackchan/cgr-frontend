import React, { useState } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { StyledSelect } from '../../styles/select'
import { formSchemaProyecto } from './Schema'
import { yupResolver } from '@hookform/resolvers/yup'
// const Input = (props) => <components.Input {...props} isHidden={false} />
export const Register = ({
  setModalShow, setReload, preData, AddContrato, GetEntidad, GetSectorProyecto, user, isBasicUsr, modedark
}) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [isUserEntidad] = useState(isBasicUsr)

  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchemaProyecto)
  })

  const getListSectorProyecto = async (inputValue) => {
    const options = []
    const response = await GetSectorProyecto()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((sectorProyecto) => {
      options.push({
        label: sectorProyecto.name,
        value: sectorProyecto.id
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
      console.log('dataForm:', dataForm)
      dataForm = {
        ...dataForm,
        userOper: user.id,
        entidad: isUserEntidad ? user.entidades[0].id : dataForm.entidad.value,
        entidad_id: isUserEntidad ? user.entidades[0].id : dataForm.entidad.value,
        sector: dataForm.sector.value
      }

      console.log('dataForm2:', dataForm)

      setDisableBtn(true)
      await AddContrato([dataForm])
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
        {!isUserEntidad && (
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridListEntidad'>
              <FormLabelStyle modedark={modedark.toString()}>Entidad</FormLabelStyle>
              <Controller
    // id='department'
                isReadOnly
                name='entidad'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, ref, ...field } }) => (
                  <StyledSelect
                    isReadOnly
                    {...field}
                    innerRef={ref}
                    {...register('entidad', { required: 'Entidad es obligatorio' })}
                    isClearable
                    classNamePrefix='Select'
      // autoload={false}
                    placeholder='Selecciona...'
                    defaultOptions
                    getOptionLabel={e => e.value + ' ' + e.label}
                    getOptionValue={e => e.value}
                    loadOptions={getListEntidades}
        // value={currentDepartment}
                    onChange={(e) => { onChange(e) }}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.entidad && (
                <Form.Text className='errors' onClick={() => clearErrors('entidad')}>
                  {errors.entidad.message}
                </Form.Text>
              )}

            </Form.Group>

          </Row>)}

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGrCodigo'>
            <FormLabelStyle modedark={modedark.toString()}>IdBpin</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. 0025-00154-0000' {...register('idBpin')}
            />

            {errors.idBpin && (
              <Form.Text className='errors' onClick={() => clearErrors('idBpin')}>
                {errors.idBpin.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPrograma'>
            <FormLabelStyle modedark={modedark.toString()}>Nombre Proyecto</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. Proyecto de adecuaciones locativas' {...register('nombreProyecto')}
            />
            {errors.nombreProyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('nombreProyecto')}>
                {errors.nombreProyecto.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Valor Proyecto</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1000364540.00' {...register('valorProyecto')}
            />
            {errors.valorProyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('valorProyecto')}>
                {errors.valorProyecto.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridduracionProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Duracion Proyecto (Días)</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 100' {...register('duracionProyecto')}
            />
            {errors.duracionProyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('duracionProyecto')}>
                {errors.duracionProyecto.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridPrograma'>
            <FormLabelStyle modedark={modedark.toString()}>Dependencia Proyecto</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. Secretaria de Educacion' {...register('dependenciaProyecto')}
            />
            {errors.dependenciaProyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('dependenciaProyecto')}>
                {errors.dependenciaProyecto.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridestrato'>
            <FormLabelStyle modedark={modedark.toString()}>Sector Proyecto</FormLabelStyle>
            <Controller
              name='sector'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('sector', { required: 'sector es obligatorio' })}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListSectorProyecto}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.sector && (
              <Form.Text className='errors' onClick={() => clearErrors('sector')}>
                {errors.sector.message}
              </Form.Text>
            )}

          </Form.Group>
        </Row>

        <Row className='mb-3'>

          <Form.Group as={Col} controlId='formGridDescripcionProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Descripción</FormLabelStyle>
            <Form.Control
              as='textarea' rows={6} placeholder='Eje. Adecuaciones locativas piso 1 y 2' {...register('descripcion')}
            />

            {errors.descripcion && (
              <Form.Text className='errors' onClick={() => clearErrors('descripcion')}>
                {errors.descripcion.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>

          <Form.Group as={Col} controlId='formGridObjetivoProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Objetivo General</FormLabelStyle>
            <Form.Control
              as='textarea' rows={6} placeholder='Eje. Solventar inconvenientes en las platas del edificio' {...register('objetivoGeneral')}
            />

            {errors.objetivoGeneral && (
              <Form.Text className='errors' onClick={() => clearErrors('objetivoGeneral')}>
                {errors.objetivoGeneral.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>

          <Form.Group as={Col} controlId='formGridObjetivoProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Programa Plan Desarrollo</FormLabelStyle>
            <Form.Control
              as='textarea' rows={6} placeholder='Eje. Plan de desarrollo económico para el municipio' {...register('programaPlanDesarrollo')}
            />

            {errors.programaPlanDesarrollo && (
              <Form.Text className='errors' onClick={() => clearErrors('programaPlanDesarrollo')}>
                {errors.programaPlanDesarrollo.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Inicio Ejecucion</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaInicioEjecucion')}
            />

            {errors.fechaInicioEjecucion && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaInicioEjecucion')}>
                {errors.fechaInicioEjecucion.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Cierre Ejecucion</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaCierreEjecucion')}
            />

            {errors.fechaCierreEjecucion && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaCierreEjecucion')}>
                {errors.fechaCierreEjecucion.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <Row className='mb-3'>
          <Row className='mb-3'>

            <Form.Group as={Col} controlId='formGridObjetivoProyecto'>
              <FormLabelStyle modedark={modedark.toString()}>Observaciones</FormLabelStyle>
              <Form.Control
                as='textarea' rows={6} placeholder='Eje. El proyecto ha presentado inconvenientes por actividades' {...register('observaciones')}
              />

              {errors.observaciones && (
                <Form.Text className='errors' onClick={() => clearErrors('observaciones')}>
                  {errors.observaciones.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

        </Row>

        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='Adicionar Proyecto' disabled={disableBtn} loading={disableBtn} /></div>
      </Form>
    </BoxForm>
  )
}
