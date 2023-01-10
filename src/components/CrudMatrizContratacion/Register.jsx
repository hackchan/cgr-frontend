import React, { useState } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { FormCheckStyle, ContainerSwitch } from '../../styles/Check'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { StyledSelect } from '../../styles/select'
import { formSchemaContrato } from './Schema'
import { yupResolver } from '@hookform/resolvers/yup'
import SelectAsyncProyectos from './SelectAsyncProyectos'
// const Input = (props) => <components.Input {...props} isHidden={false} />
export const Register = ({
  setModalShow, setReload, preData, AddContrato, GetEntidad, GetEstadoContrato, user, isBasicUsr, modedark, GetClaseContrato, GetOrigenRecursoObra, GetFormaContrato, GetProyectosByEntidad
}) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [isUserEntidad] = useState(isBasicUsr)
  const [interventor, setInterventor] = useState(false)
  const [anticipo, setAnticipo] = useState(false)
  const [entidadId, setEntidadId] = useState('')
  const [proyectoSel, setProyectoSel] = useState('')
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchemaContrato)
  })
  const handleEntidad = (e) => {
    if (e) {
      setProyectoSel(null)
      setEntidadId(e.value)
    }
  }

  const handleInputInterventorChange = () => {
    setInterventor(!interventor)
  }

  const getListClaseContrato = async (inputValue) => {
    const options = []
    const response = await GetClaseContrato()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((clase) => {
      options.push({
        label: clase.name,
        value: clase.id
      })
    })
    return options
  }

  const getListFormaContrato = async (inputValue) => {
    const options = []
    const response = await GetFormaContrato()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((forma) => {
      options.push({
        label: forma.name,
        value: forma.id
      })
    })
    return options
  }

  const getListEstadoContrato = async (inputValue) => {
    const options = []
    const response = await GetEstadoContrato()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((estado) => {
      options.push({
        label: estado.name,
        value: estado.id
      })
    })
    return options
  }

  const getListOrigenRecurso = async (inputValue) => {
    const options = []
    const response = await GetOrigenRecursoObra()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((clase) => {
      options.push({
        label: clase.name,
        value: clase.id
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
                name='entidad'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, ref, ...field } }) => (
                  <StyledSelect
                    {...field}
                    innerRef={ref}
                    {...register('entidad')}
                    isClearable
                    classNamePrefix='Select'
      // autoload={false}
                    placeholder='Selecciona...'
                    defaultOptions
                    getOptionLabel={e => e.value + ' ' + e.label}
                    getOptionValue={e => e.value}
                    loadOptions={getListEntidades}
        // value={currentDepartment}
                    onChange={(e) => { onChange(e); handleEntidad(e) }}
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

          </Row>
        )}

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGrCodigo'>
            <FormLabelStyle modedark={modedark.toString()}>IdContrato</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. 0025-00154-0000' {...register('idContrato')}
            />

            {errors.idContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('idContrato')}>
                {errors.idContrato.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridListMunicipio'>
            <FormLabelStyle modedark={modedark.toString()}>Proyecto</FormLabelStyle>
            <Controller
              name='proyecto'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectAsyncProyectos
                  field={field}
                  entidad={entidadId}
                  value={proyectoSel}
                  onChange={(country) => setProyectoSel(country)}
                  GetProyectosByEntidad={GetProyectosByEntidad}
                  setProyecto={setProyectoSel}
                  register={register}
                />
              )}
            />
            {errors.proyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('proyecto')}>
                {errors.proyecto.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGrideFuente'>
            <FormLabelStyle modedark={modedark.toString()}>Fuente Recurso</FormLabelStyle>
            <Controller
              name='fuenteRecurso'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('fuenteRecurso')}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListOrigenRecurso}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.fuenteRecurso && (
              <Form.Text className='errors' onClick={() => clearErrors('fuenteRecurso')}>
                {errors.fuenteRecurso.message}
              </Form.Text>
            )}

          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridLinea'>
            <FormLabelStyle modedark={modedark.toString()}>Linea</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. Mejoramiento de instalaciones educativas del municipio' {...register('linea')}
            />
            {errors.linea && (
              <Form.Text className='errors' onClick={() => clearErrors('linea')}>
                {errors.linea.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridobjetoContrato'>
            <FormLabelStyle modedark={modedark.toString()}>Objeto del Contrato</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. Construcción de …' {...register('objetoContrato')}
            />
            {errors.objetoContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('objetoContrato')}>
                {errors.objetoContrato.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGrideClaseContrato'>
            <FormLabelStyle modedark={modedark.toString()}>Clase Contrato</FormLabelStyle>
            <Controller
              name='claseContrato'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('claseContrato', { required: 'Clase Contrato es obligatorio' })}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListClaseContrato}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.claseContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('claseContrato')}>
                {errors.claseContrato.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorContrato'>
            <FormLabelStyle modedark={modedark.toString()}>valorContrato</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1000364540.00' {...register('valorContrato')}
            />
            {errors.valorContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('valorContrato')}>
                {errors.valorContrato.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridrazonSocialContratista'>
            <FormLabelStyle modedark={modedark.toString()}>Razon Social Contratista</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. Juan Ejemplo' {...register('razonSocialContratista')}
            />
            {errors.razonSocialContratista && (
              <Form.Text className='errors' onClick={() => clearErrors('razonSocialContratista')}>
                {errors.razonSocialContratista.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGrididContratista'>
            <FormLabelStyle modedark={modedark.toString()}>Id Contratista</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 900900081' {...register('idContratista')}
            />
            {errors.idContratista && (
              <Form.Text className='errors' onClick={() => clearErrors('idContratista')}>
                {errors.idContratista.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrididContratista'>
            <FormLabelStyle modedark={modedark.toString()}>Domicilio Contratista</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. Carrera 24 # 134-22' {...register('domicilioContratista')}
            />
            {errors.domicilioContratista && (
              <Form.Text className='errors' onClick={() => clearErrors('domicilioContratista')}>
                {errors.domicilioContratista.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrididContratista'>
            <FormLabelStyle modedark={modedark.toString()}>Telefono Contratista</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 3183895020' {...register('telefonoContratista')}
            />
            {errors.telefonoContratista && (
              <Form.Text className='errors' onClick={() => clearErrors('telefonoContratista')}>
                {errors.telefonoContratista.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrididContratista'>
            <FormLabelStyle modedark={modedark.toString()}>Email Contratista</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. contratista@dominiocorreo.com' {...register('emailContratista')}
            />
            {errors.emailContratista && (
              <Form.Text className='errors' onClick={() => clearErrors('emailContratista')}>
                {errors.emailContratista.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Firma Contrato</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaFirmaContrato')}
            />

            {errors.fechaFirmaContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaFirmaContrato')}>
                {errors.fechaFirmaContrato.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Registro Presupuestal</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaRP')}
            />

            {errors.fechaRP && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaRP')}>
                {errors.fechaRP.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrideClaseContrato'>
            <FormLabelStyle modedark={modedark.toString()}>Forma Contratacion</FormLabelStyle>
            <Controller
              name='formaContratacion'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('estado', { required: 'Forma Contratacion es obligatorio' })}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListFormaContrato}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.formaContratacion && (
              <Form.Text className='errors' onClick={() => clearErrors('formaContratacion')}>
                {errors.formaContratacion.message}
              </Form.Text>
            )}

          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Valor del Registro Presupuestal</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1000364540.00' {...register('valorRP')}
            />
            {errors.valorRP && (
              <Form.Text className='errors' onClick={() => clearErrors('valorRP')}>
                {errors.valorRP.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Cod. Rubro Registro Presupuestal</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 2.1.3.14' {...register('codRubroRP')}
            />
            {errors.codRubroRP && (
              <Form.Text className='errors' onClick={() => clearErrors('codRubroRP')}>
                {errors.codRubroRP.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId='formGridFuenteFinanRP'>
            <FormLabelStyle modedark={modedark.toString()}>Fuente Financiacion RP</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. Indemnización' {...register('fuenteFinanRP')}
            />
            {errors.fuenteFinanRP && (
              <Form.Text className='errors' onClick={() => clearErrors('fuenteFinanRP')}>
                {errors.fuenteFinanRP.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>

          <ContainerSwitch>
            <Form.Group as={Col} controlId='formGridCapital'>
              <FormCheckStyle
                checked={interventor}
                id='interventor'
                type='switch'
                label='Interventor'
                onChange={handleInputInterventorChange}
                modedark={modedark.toString()}
              />
            </Form.Group>

          </ContainerSwitch>
        </Row>

        {interventor && (
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridvalorProyecto'>
              <FormLabelStyle modedark={modedark.toString()}>Id Interventor</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='eje. 900900081' {...register('idInterventor')}
              />
              {errors.idInterventor && (
                <Form.Text className='errors' onClick={() => clearErrors('idInterventor')}>
                  {errors.idInterventor.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId='formGridvalorProyecto'>
              <FormLabelStyle modedark={modedark.toString()}>Nombre Interventor</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='eje. Juan Ejemplo' {...register('nombreInterventor')}
              />
              {errors.nombreInterventor && (
                <Form.Text className='errors' onClick={() => clearErrors('nombreInterventor')}>
                  {errors.nombreInterventor.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId='formGridvalorProyecto'>
              <FormLabelStyle modedark={modedark.toString()}>Tipo De Vinculación</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='eje. ...' {...register('tipoVinculacion')}
              />
              {errors.tipoVinculacion && (
                <Form.Text className='errors' onClick={() => clearErrors('tipoVinculacion')}>
                  {errors.tipoVinculacion.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>)}
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Aprobacion Garantia Unica</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaAprobacion')}
            />

            {errors.fechaAprobacion && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaAprobacion')}>
                {errors.fechaAprobacion.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Inicio Contrato</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaInicioContrato')}
            />

            {errors.fechaInicioContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaInicioContrato')}>
                {errors.fechaInicioContrato.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Plazo Contrato (días)</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 180' {...register('plazoContrato')}
            />
            {errors.plazoContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('plazoContrato')}>
                {errors.plazoContrato.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Unidad Ejecucion</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. Secretaría de Educación' {...register('unidadEjecucion')}
            />
            {errors.unidadEjecucion && (
              <Form.Text className='errors' onClick={() => clearErrors('unidadEjecucion')}>
                {errors.unidadEjecucion.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>

          <ContainerSwitch>
            <Form.Group as={Col} controlId='formGridCapital'>
              <FormCheckStyle
                checked={anticipo}
                id='isAnticipo-2'
                type='switch'
                label='Anticipo'
                onChange={() => { setAnticipo(!anticipo) }}
                modedark={modedark.toString()}
              />
            </Form.Group>

          </ContainerSwitch>
        </Row>
        {anticipo && (
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridvalorProyecto'>
              <FormLabelStyle modedark={modedark.toString()}>Valor Pagado Anticipo</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='text' placeholder='eje. 900900081' {...register('valorPagadoAnticipo')}
              />
              {errors.valorPagadoAnticipo && (
                <Form.Text className='errors' onClick={() => clearErrors('valorPagadoAnticipo')}>
                  {errors.valorPagadoAnticipo.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId='formGridFecha'>
              <FormLabelStyle modedark={modedark.toString()}>Fecha Pago Anticipo</FormLabelStyle>
              <Form.Control
                style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaPagoAnticipo')}
              />

              {errors.fechaPagoAnticipo && (
                <Form.Text className='errors' onClick={() => clearErrors('fechaPagoAnticipo')}>
                  {errors.fechaPagoAnticipo.message}
                </Form.Text>
              )}
            </Form.Group>

          </Row>)}

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Cantidad Adiciones</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 2' {...register('cantidadAdiciones')}
            />
            {errors.cantidadAdiciones && (
              <Form.Text className='errors' onClick={() => clearErrors('cantidadAdiciones')}>
                {errors.cantidadAdiciones.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorContrato'>
            <FormLabelStyle modedark={modedark.toString()}>Valor Total Adiciones</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1000000.35' {...register('valorTotalAdiciones')}
            />
            {errors.valorTotalAdiciones && (
              <Form.Text className='errors' onClick={() => clearErrors('valorTotalAdiciones')}>
                {errors.valorTotalAdiciones.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Cantidad Prorrogas</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 2' {...register('cantidadProrrogas')}
            />
            {errors.cantidadProrrogas && (
              <Form.Text className='errors' onClick={() => clearErrors('cantidadProrrogas')}>
                {errors.cantidadProrrogas.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Tiempo Prorrogas</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 180' {...register('tiempoProrrogas')}
            />
            {errors.tiempoProrrogas && (
              <Form.Text className='errors' onClick={() => clearErrors('tiempoProrrogas')}>
                {errors.tiempoProrrogas.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>cantidad Suspenciones</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 2' {...register('cantidadSuspenciones')}
            />
            {errors.cantidadSuspenciones && (
              <Form.Text className='errors' onClick={() => clearErrors('cantidadSuspenciones')}>
                {errors.cantidadSuspenciones.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Tiempo Suspenciones</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 180' {...register('tiempoSuspenciones')}
            />
            {errors.tiempoSuspenciones && (
              <Form.Text className='errors' onClick={() => clearErrors('tiempoSuspenciones')}>
                {errors.tiempoSuspenciones.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridvalorContrato'>
            <FormLabelStyle modedark={modedark.toString()}>valor Total Pagos</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1000364540.00' {...register('valorTotalPagos')}
            />
            {errors.valorTotalPagos && (
              <Form.Text className='errors' onClick={() => clearErrors('valorTotalPagos')}>
                {errors.valorTotalPagos.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Termina Contrato</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaTerminaContrato')}
            />

            {errors.fechaTerminaContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaTerminaContrato')}>
                {errors.fechaTerminaContrato.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Acta Liquidacion</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaActaLiquidacion')}
            />

            {errors.fechaActaLiquidacion && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaActaLiquidacion')}>
                {errors.fechaActaLiquidacion.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrideClaseContrato'>
            <FormLabelStyle modedark={modedark.toString()}>Estado Contrato</FormLabelStyle>
            <Controller
              name='estado'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('estado', { required: 'Estado Contrato es obligatorio' })}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListEstadoContrato}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.estado && (
              <Form.Text className='errors' onClick={() => clearErrors('estado')}>
                {errors.estado.message}
              </Form.Text>
            )}

          </Form.Group>
        </Row>
        <Row className='mb-3'>

          <Form.Group as={Col} controlId='formGridobservaciones'>
            <FormLabelStyle modedark={modedark.toString()}>Observaciones</FormLabelStyle>
            <Form.Control
              as='textarea' rows={6} placeholder='Eje. Se presentan retrasos en obra derivado a la falta de materias primas.' {...register('observaciones')}
            />

            {errors.observaciones && (
              <Form.Text className='errors' onClick={() => clearErrors('observaciones')}>
                {errors.observaciones.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='Adicionar Contrato' disabled={disableBtn} loading={disableBtn} /></div>
      </Form>
    </BoxForm>
  )
}
