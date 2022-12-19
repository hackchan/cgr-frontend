import React, { useState, useCallback, useRef } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { StyledSelect } from '../../styles/select'

export const Update = ({
  setModalUpdateShow, setReload, preData, data, UpdateProyecto, GetEntidad, GetSectorProyecto, user, isBasicUsr, modedark
}) => {
  console.log('la data:', data)
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [isUserEntidad] = useState(isBasicUsr)
  const [entidadSel, setEntidadSel] = useState({ label: data.entidad.name, value: data.entidad.id })
  const [sectorSel, setSectorSel] = useState({ label: data.sector.name, value: data.sector.id })

  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      idBpin: data.idBpin,
      nombreProyecto: data.nombreProyecto,
      duracionProyecto: data.duracionProyecto,
      valorProyecto: data.valorProyecto,
      dependenciaProyecto: data.dependenciaProyecto,
      descripcion: data.descripcion,
      objetivoGeneral: data.objetivoGeneral,
      programaPlanDesarrollo: data.programaPlanDesarrollo,
      fechaCierreEjecucion: data.fechaCierreEjecucion,
      fechaInicioEjecucion: data.fechaInicioEjecucion,
      observaciones: data.observaciones

    }
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
      const entidadId = isUserEntidad ? user.entidades[0].id : dataForm.entidad.value
      dataForm = {
        ...dataForm,
        userOper: user.id,
        entidad: entidadId,
        entidad_id: entidadId,
        sector: dataForm.sector.value
      }
      console.log('dataForm2:', dataForm)
      setDisableBtn(true)
      delete dataForm.entidad
      delete dataForm.entidad_id
      delete dataForm.idBpin
      await UpdateProyecto(dataForm, data.idBpin, entidadId)
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
        {!isUserEntidad &&
        (
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridListEntidad'>
              <FormLabelStyle modedark={modedark.toString()}>Entidad</FormLabelStyle>
              <Controller
    // id='department'
                name='entidad'
                defaultValue={entidadSel}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, ref, ...field } }) => (
                  <StyledSelect
                    isDisabled
                    value={entidadSel}
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
                    onChange={(e) => { onChange(e); setEntidadSel(e) }}
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
              style={{ height: 38 }} type='text' placeholder='Eje. 0025-00154-0000' disabled {...register('idBpin', {
                required: 'código BPIN es obligatorio',
                pattern: {
                  value: /(^[0-9a-zA-Z]*[0-9a-zA-Z-]*[0-9a-zA-Z]$)/,
                  message: 'No es un código BPIN válido'
                }
              })}
            />

            {errors.IdBpin && (
              <Form.Text className='errors' onClick={() => clearErrors('IdBpin')}>
                {errors.IdBpin.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPrograma'>
            <FormLabelStyle modedark={modedark.toString()}>Nombre Proyecto</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. Proyecto de adecuaciones locativas' {...register('nombreProyecto', {
                required: 'Nombre Proyecto es obligatorio',
                minLength: { value: 3, message: 'La longitud mínima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud máxima es de 64 caracteres' },
                pattern: {
                  value: /(^[a-zA-ZÑñ. ]*[a-zA-Z-_Ññ. ]*[a-zA-ZÑñ. ]$)/,
                  message: 'Nombre Proyecto no válido'
                }
              })}
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
              style={{ height: 38 }} type='text' placeholder='eje. 1000364540.00' {...register('valorProyecto', {
                required: 'valor proyecto es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor de proyecto válido'
                }
              })}
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
              style={{ height: 38 }} type='text' placeholder='eje. 100' {...register('duracionProyecto', {
                required: 'Duracion Proyecto es obligatorio',
                pattern: {
                  value: /^([0-9]{1,6})$/,
                  message: 'No es un valor válido, expresar en días'
                }
              })}
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
              style={{ height: 38 }} type='text' placeholder='Eje. Secretaria de Educacion' {...register('dependenciaProyecto', {
                required: 'dependencia Proyecto es obligatorio',
                minLength: { value: 3, message: 'La longitud mínima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud máxima es de 64 caracteres' },
                pattern: {
                  value: /(^[a-zA-ZÑñ. ]*[a-zA-Z-_Ññ. ]*[a-zA-ZÑñ. ]$)/,
                  message: 'dependencia Proyecto no válido'
                }
              })}
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
              defaultValue={sectorSel}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  value={sectorSel}
                  innerRef={ref}
                  {...register('sector', { required: 'sector es obligatorio' })}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListSectorProyecto}
                  onChange={(e) => { onChange(e); setSectorSel(e) }}
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
              as='textarea' rows={6} placeholder='Eje. Adecuaciones locativas piso 1 y 2' {...register('descripcion', {
                required: 'Descripción es obligatorio',
                minLength: { value: 2, message: 'La longitud mínima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud máxima es de 300 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
                  message: 'No es una Descripción válida'
                }
              })}
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
              as='textarea' rows={6} placeholder='Eje. Solventar inconvenientes en las platas del edificio' {...register('objetivoGeneral', {
                required: 'Objetivo General es obligatorio',
                minLength: { value: 2, message: 'La longitud mínima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud máxima es de 300 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
                  message: 'No es una Objetivo General válido'
                }
              })}
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
              as='textarea' rows={6} placeholder='Eje. Plan de desarrollo económico para el municipio' {...register('programaPlanDesarrollo', {
                required: 'programa Plan Desarrollo es obligatorio',
                minLength: { value: 2, message: 'La longitud mínima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud máxima es de 300 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
                  message: 'No es un programa Plan Desarrollo válido'
                }
              })}
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
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaInicioEjecucion', {
                required: 'Fecha Inicio Ejecucion es obligatorio'
              })}
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
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaCierreEjecucion', {
                required: 'Fecha Cierre Ejecucion es obligatorio'
              })}
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
                as='textarea' rows={6} placeholder='Eje. El proyecto ha presentado inconvenientes por actividades' {...register('observaciones', {
                  required: 'observaciones es obligatorio',
                  minLength: { value: 2, message: 'La longitud mínima es de 2 caracteres' },
                  maxLength: { value: 300, message: 'La longitud máxima es de 300 caracteres' },
                  pattern: {
                    value: /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.%$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.%$,\r\n ]$)/,
                    message: 'No es una observacion válida'
                  }
                })}
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
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='Actualizar Matricula' disabled={disableBtn} loading={disableBtn} /></div>
      </Form>
    </BoxForm>
  )
}
