import React, { useState, useEffect } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { StyledSelect } from '../../styles/select'

export const Register = ({ setModal, setReload, preData, AddMatrizObra, GetSectorObra, GetOrigenRecursoObra, GetEstadoObra, GetEntidad, getDepartments, getMunicipios, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [depart, setDepart] = useState(null)
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange'
  })
  const handleDeparts = (e) => {
    console.log(e)
    setDepart(e)
  }
  // const handleSelectDepartmentChange = (values) => {
  //   console.log('HOMERO SIMS:', values)
  //   if (values) {
  //     setDepart(values.label)
  //   }
  // }
  useEffect(() => {
  }, [depart])
  const getListSector = async (inputValue) => {
    const options = []
    const response = await GetSectorObra()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((sectorObra) => {
      options.push({
        label: sectorObra.name,
        value: sectorObra.id
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

    filter.forEach((origen) => {
      options.push({
        label: origen.name,
        value: origen.id
      })
    })
    return options
  }

  const getListEstadoObra = async (inputValue) => {
    const options = []
    const response = await GetEstadoObra()
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

  const getListDepartamentos = async (inputValue) => {
    const options = []
    const response = await getDepartments()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((depart) => {
      options.push({
        label: depart.name,
        value: depart.id
      })
    })
    return options
  }

  const getListMunicipios = async (inputValue) => {
    console.log('depart:', depart)
    const options = []
    const response = await getMunicipios(null)
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((muni) => {
      options.push({
        label: muni.name,
        value: muni.id
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
      setDisableBtn(true)
      await AddMatrizObra(dataForm)
      setModal(false)
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
                  {...register('entidad', { required: 'entidad obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                  cacheOptions
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
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

          <Form.Group as={Col} controlId='formGridListSector'>
            <FormLabelStyle modedark={modedark.toString()}>Sector Obra</FormLabelStyle>
            <Controller
              // id='department'
              name='sector'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('sector', { required: 'Sector es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={getListSector}
                  // value={currentDepartment}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
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
          <Form.Group as={Col} controlId='formGridListdepartamentoObra'>
            <FormLabelStyle modedark={modedark.toString()}>Departamento Obra</FormLabelStyle>
            <Controller
              // id='department'
              name='departamentoObra'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, value, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('departamentoObra', { required: 'Departamento Obra es obligatorio' })}
                  isClearable
                  cacheOptions
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  loadOptions={getListDepartamentos}
                  // loadOptions={(e) => getListDepartamentos(e)}
                  // value={currentDepartment}
                  onChange={(e) => { onChange(e); handleDeparts(e) }}
                  // onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.departamentoObra && (
              <Form.Text className='errors' onClick={() => clearErrors('departamentoObra')}>
                {errors.departamentoObra.message}
              </Form.Text>
            )}

          </Form.Group>
          <Form.Group as={Col} controlId='formGridListMunicipio'>
            <FormLabelStyle modedark={modedark.toString()}>Municipio Obra</FormLabelStyle>
            <Controller
              // id='department'
              name='municipioObra'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('municipioObra', { required: 'Municipio Obra es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  defaultOptions
                  placeholder='Selecciona...'
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={(e) => getListMunicipios(e)}
                  // value={currentDepartment}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.municipioObra && (
              <Form.Text className='errors' onClick={() => clearErrors('municipioObra')}>
                {errors.municipioObra.message}
              </Form.Text>
            )}

          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridBpin'>
            <FormLabelStyle modedark={modedark.toString()}>Bpin</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. 6490-788745' {...register('bpin', {
                required: 'código bpin es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 20, message: 'La longitud maxima es de 20 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
                  message: 'No es un código bpin válido'
                }
              })}
            />

            {errors.bpin && (
              <Form.Text className='errors' onClick={() => clearErrors('bpin')}>
                {errors.bpin.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridContrato'>
            <FormLabelStyle modedark={modedark.toString()}>Id Contrato</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. LL45-122' {...register('idContrato', {
                required: 'código idContrato es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 20, message: 'La longitud maxima es de 20 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
                  message: 'No es un código idContrato válido'
                }
              })}
            />

            {errors.idContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('idContrato')}>
                {errors.idContrato.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrnroContrato'>
            <FormLabelStyle modedark={modedark.toString()}>Nro Contrato</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. c-4587-2021' {...register('nroContrato', {
                required: 'Nro Contrato es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 20, message: 'La longitud maxima es de 20 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
                  message: 'No es Nro Contrato válido'
                }
              })}
            />

            {errors.nroContrato && (
              <Form.Text className='errors' onClick={() => clearErrors('nroContrato')}>
                {errors.nroContrato.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridNombreProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Nombre Proyecto</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. FNGRD-127 - Mejoramiento Viviendas' {...register('nombreproyecto', {
                required: 'nombre proyecto es obligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÑñ ]*[0-9a-zA-Z-_Ññ ]*[0-9a-zA-ZÑñ ]$)/,
                  message: 'No es un nombre proyecto válido'
                }
              })}
            />
            {errors.nombreproyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('nombreproyecto')}>
                {errors.nombreproyecto.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridUnidadFuncional'>
            <FormLabelStyle modedark={modedark.toString()}>Unidad Funcional</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. FNGRD-127 - Mejoramiento Viviendas' {...register('unidadfuncional', {
                required: 'Unidad funcional es obligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÑñ ]*[0-9a-zA-Z-_Ññ ]*[0-9a-zA-ZÑñ ]$)/,
                  message: 'No es un nombre unidad funcional válido'
                }
              })}
            />
            {errors.unidadfuncional && (
              <Form.Text className='errors' onClick={() => clearErrors('unidadfuncional')}>
                {errors.unidadfuncional.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row>

          <Form.Group as={Col} controlId='formGridObjetoProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Objecto Proyecto</FormLabelStyle>
            <Form.Control
              as='textarea' rows={6} placeholder='Eje. Reconstruccion de la estructura de viviendas afectadas en el departamento de Antioquia' {...register('objectoProyecto', {
                required: 'Objecto de proyecto es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud maxima es de 300 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÀ-ÿÑñ.,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.,\r\n ]$)/,
                  message: 'No es un objectoProyecto válido'
                }
              })}
            />

            {errors.objectoProyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('objectoProyecto')}>
                {errors.objectoProyecto.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Suscripcion</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaSuscripcion', {
                required: 'Fecha Suscripcion es obligatorio'
              })}
            />

            {errors.fechaSuscripcion && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaSuscripcion')}>
                {errors.fechaSuscripcion.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridFecha'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Inicio</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaInicio', {
                required: 'Fecha Inicio es obligatorio'
              })}
            />

            {errors.fechaInicio && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaInicio')}>
                {errors.fechaInicio.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridfechaProgTerminacion'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Progra Terminacion</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaProgTerminacion', {
                required: 'Fecha Suscripcion es obligatorio'
              })}
            />

            {errors.fechaProgTerminacion && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaProgTerminacion')}>
                {errors.fechaProgTerminacion.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridFechaTerminacion'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Terminación</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaTerminacion', {
                required: 'Fecha terminacion es obligatorio'
              })}
            />

            {errors.fechaTerminacion && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaTerminacion')}>
                {errors.fechaTerminacion.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridcontratoInicial'>
            <FormLabelStyle modedark={modedark.toString()}>Valor contrato Inicial</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1000364540.00' {...register('contratoInicial', {
                required: 'Contrato Inicial es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.contratoInicial && (
              <Form.Text className='errors' onClick={() => clearErrors('contratoInicial')}>
                {errors.contratoInicial.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridcontratoFinal'>
            <FormLabelStyle modedark={modedark.toString()}>Valor contrato Final</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1500364540.00' {...register('contratoFinal', {
                required: 'Contrato Final es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.contratoFinal && (
              <Form.Text className='errors' onClick={() => clearErrors('contratoFinal')}>
                {errors.contratoFinal.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGriAvancefiscoProgramado'>
            <FormLabelStyle modedark={modedark.toString()}>Avance fisico programado</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 0.80' {...register('avanceFisicoProgramado', {
                required: 'Avance Fisico Programado es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 1' },
                pattern: {
                  value: /^((0)(\.\d{1,2})?|(1))$/,
                  message: 'No es un valor valido '
                }
              })}
            />
            {errors.avanceFisicoProgramado && (
              <Form.Text className='errors' onClick={() => clearErrors('avanceFisicoProgramado')}>
                {errors.avanceFisicoProgramado.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGriAvanceFisicoEjecutado'>
            <FormLabelStyle modedark={modedark.toString()}>Avance Fisico Ejecutado</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 0.80' {...register('avanceFisicoEjecutado', {
                required: 'Avance Fisico Ejecutado es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 1' },
                pattern: {
                  value: /^((0)(\.\d{1,2})?|(1))$/,
                  message: 'No es un valor valido '
                }
              })}
            />
            {errors.avanceFisicoEjecutado && (
              <Form.Text className='errors' onClick={() => clearErrors('avanceFisicoEjecutado')}>
                {errors.avanceFisicoEjecutado.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGriAvanceFinancieroEjecutado'>
            <FormLabelStyle modedark={modedark.toString()}>Avance Financiero Ejecutado</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 0.80' {...register('avanceFinancieroEjecutado', {
                required: 'Avance Financiero Ejecutado es obligatorio',
                pattern: {
                  value: /^((0)(\.\d{1,2})?|(1))$/,
                  message: 'No es un valor valido, solo valores entre 0 y 1 '
                }
              })}
            />
            {errors.avanceFinancieroEjecutado && (
              <Form.Text className='errors' onClick={() => clearErrors('avanceFinancieroEjecutado')}>
                {errors.avanceFinancieroEjecutado.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGriCantidadSuspenciones'>
            <FormLabelStyle modedark={modedark.toString()}>Cantidad de Suspenciones</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 2' {...register('cantidadSuspenciones', {
                required: 'Cantidad Suspenciones es obligatorio',
                pattern: {
                  value: /^(([0-9])(\d)?|(100))$/,
                  message: 'No es un valor valido, solo número entre 0 y 100'
                }
              })}
            />
            {errors.cantidadSuspenciones && (
              <Form.Text className='errors' onClick={() => clearErrors('cantidadSuspenciones')}>
                {errors.cantidadSuspenciones.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGriCantidadProrrogas'>
            <FormLabelStyle modedark={modedark.toString()}>Cantidad Prorrogas</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 2' {...register('cantidadProrrogas', {
                required: 'Cantidad Prorrogas es obligatorio',
                pattern: {
                  value: /^(([0-9])(\d)?|(100))$/,
                  message: 'No es un valor valido, solo número entre 0 y 100'
                }
              })}
            />
            {errors.cantidadProrrogas && (
              <Form.Text className='errors' onClick={() => clearErrors('cantidadProrrogas')}>
                {errors.cantidadProrrogas.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGriCantidadAdiciones'>
            <FormLabelStyle modedark={modedark.toString()}>Cantidad Adiciones</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 2' {...register('cantidadAdiciones', {
                required: 'Cantidad Adiciones es obligatorio',
                pattern: {
                  value: /^(([0-9])(\d)?|(100))$/,
                  message: 'No es un valor valido, solo número entre 0 y 100'
                }
              })}
            />
            {errors.cantidadAdiciones && (
              <Form.Text className='errors' onClick={() => clearErrors('cantidadAdiciones')}>
                {errors.cantidadAdiciones.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridTiempoSuspenciones'>
            <FormLabelStyle modedark={modedark.toString()}>Tiempo Suspenciones en dias</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 100' {...register('tiempoSuspenciones', {
                required: 'Tiempo Suspenciones es obligatorio',
                pattern: {
                  value: /^([0-9]{1,6})$/,
                  message: 'No es un valor valido, expresar en dias'
                }
              })}
            />
            {errors.tiempoSuspenciones && (
              <Form.Text className='errors' onClick={() => clearErrors('tiempoSuspenciones')}>
                {errors.tiempoSuspenciones.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridtiempoProrrogas'>
            <FormLabelStyle modedark={modedark.toString()}>Tiempo Prorrogas en dias</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 51' {...register('tiempoProrrogas', {
                required: 'Tiempo Prorrogas es obligatorio',
                pattern: {
                  value: /^([0-9]{1,6})$/,
                  message: 'No es un valor valido, expresar en dias'
                }
              })}
            />
            {errors.tiempoProrrogas && (
              <Form.Text className='errors' onClick={() => clearErrors('tiempoProrrogas')}>
                {errors.tiempoProrrogas.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridvalorTotalAdiciones'>
            <FormLabelStyle modedark={modedark.toString()}>Valor Total Adiciones</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1000364540.00' {...register('valorTotalAdiciones', {
                required: 'Valor Total Adicioneses obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.valorTotalAdiciones && (
              <Form.Text className='errors' onClick={() => clearErrors('valorTotalAdiciones')}>
                {errors.valorTotalAdiciones.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorComprometido'>
            <FormLabelStyle modedark={modedark.toString()}>Valor Comprometido</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1500364540.00' {...register('valorComprometido', {
                required: 'Valor Comprometido es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.valorComprometido && (
              <Form.Text className='errors' onClick={() => clearErrors('valorComprometido')}>
                {errors.valorComprometido.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorObligado'>
            <FormLabelStyle modedark={modedark.toString()}>Valor Obligado</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1500364540.00' {...register('valorObligado', {
                required: 'Valor Obligado es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.valorObligado && (
              <Form.Text className='errors' onClick={() => clearErrors('valorObligado')}>
                {errors.valorObligado.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorPagado'>
            <FormLabelStyle modedark={modedark.toString()}>Valor Pagado</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1500364540.00' {...register('valorPagado', {
                required: 'Valor Pagado es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.valorPagado && (
              <Form.Text className='errors' onClick={() => clearErrors('valorPagado')}>
                {errors.valorPagado.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorAnticipo'>
            <FormLabelStyle modedark={modedark.toString()}>Valor Anticipo</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1500364540.00' {...register('valorAnticipo', {
                required: 'Valor Anticipo es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.valorAnticipo && (
              <Form.Text className='errors' onClick={() => clearErrors('valorAnticipo')}>
                {errors.valorAnticipo.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridrazonSocialContratista'>
            <FormLabelStyle modedark={modedark.toString()}>Razon Social Contratista</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. FUNDACION ALIANZA SAS' {...register('razonSocialContratista', {
                required: 'Razon Social Contratista es obligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÑñ ]*[0-9a-zA-Z-_Ññ ]*[0-9a-zA-ZÑñ ]$)/,
                  message: 'No es una Razon Social Contratista válido'
                }
              })}
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
              style={{ height: 38 }} type='text' placeholder='eje. 985478512' {...register('idContratista', {
                required: 'Id Contratista es obligatorio',
                pattern: {
                  value: /^([0-9]{1,13})$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.idContratista && (
              <Form.Text className='errors' onClick={() => clearErrors('idContratista')}>
                {errors.idContratista.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridrazonSocialNuevoContratista'>
            <FormLabelStyle modedark={modedark.toString()}>Razon Social Nuevo Contratista</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. CONSORCIO NORTE SAS' {...register('razonSocialNuevoContratista', {
                required: 'Razon Social Nuevo Contratista es obligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÑñ/ ]*[0-9a-zA-Z-_Ññ/ ]*[0-9a-zA-ZÑñ/ ]$)/,
                  message: 'No es una Razon Social Contratista válido'
                }
              })}
            />
            {errors.razonSocialNuevoContratista && (
              <Form.Text className='errors' onClick={() => clearErrors('razonSocialNuevoContratista')}>
                {errors.razonSocialNuevoContratista.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrididNuevoContratista'>
            <FormLabelStyle modedark={modedark.toString()}>Id Nuevo Contratista</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 985478512' {...register('idNuevoContratista', {
                required: 'Id Nuevo Contratista es obligatorio',
                pattern: {
                  value: /^([0-9]{1,13})$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.idNuevoContratista && (
              <Form.Text className='errors' onClick={() => clearErrors('idNuevoContratista')}>
                {errors.idNuevoContratista.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>

          <Form.Group as={Col} controlId='formGridobservaciones'>
            <FormLabelStyle modedark={modedark.toString()}>Observaciones</FormLabelStyle>
            <Form.Control
              as='textarea' rows={6} placeholder='Eje. Se presentan retrasos en obra derivado a la falta de materias primas.' {...register('observaciones', {
                required: 'Observaciones obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud maxima es de 300 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÀ-ÿÑñ.,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.,\r\n ]$)/,
                  message: 'No es un observacion válida'
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
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGrnroContratoInterventoria'>
            <FormLabelStyle modedark={modedark.toString()}>Nro Contrato Interventoria</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. 45879-2019' {...register('nroContratoInterventoria', {
                required: 'Nro Contrato Interventoria es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 20, message: 'La longitud maxima es de 20 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
                  message: 'No es Nro Contrato Interventoria válido'
                }
              })}
            />

            {errors.nroContratoInterventoria && (
              <Form.Text className='errors' onClick={() => clearErrors('nroContratoInterventoria')}>
                {errors.nroContratoInterventoria.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridnombreInterventoria'>
            <FormLabelStyle modedark={modedark.toString()}>Nombre Interventoria</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. LAGO LUNS' {...register('nombreInterventoria', {
                required: 'Nombre Interventoria es obligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÑñ/ ]*[0-9a-zA-Z-_Ññ/ ]*[0-9a-zA-ZÑñ/ ]$)/,
                  message: 'No es un Nombre Interventoria válido'
                }
              })}
            />
            {errors.nombreInterventoria && (
              <Form.Text className='errors' onClick={() => clearErrors('nombreInterventoria')}>
                {errors.nombreInterventoria.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrididInterventoria'>
            <FormLabelStyle modedark={modedark.toString()}>Id Interventoria</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 988888777' {...register('idInterventoria', {
                required: 'Id Interventoria es obligatorio',
                pattern: {
                  value: /^([0-9]{1,13})$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.idInterventoria && (
              <Form.Text className='errors' onClick={() => clearErrors('idInterventoria')}>
                {errors.idInterventoria.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGrdiaCorte'>
            <FormLabelStyle modedark={modedark.toString()}>Dia Corte</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1' {...register('diaCorte', {
                required: 'Dia Corte es obligatorio',
                min: { value: 1, message: 'Dia minimo es 1' },
                max: { value: 31, message: 'Dia Maximo es 31' }

              })}
            />
            {errors.diaCorte && (
              <Form.Text className='errors' onClick={() => clearErrors('diaCorte')}>
                {errors.diaCorte.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGmesCorte'>
            <FormLabelStyle modedark={modedark.toString()}>Mes Corte</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='number' placeholder='eje. 10' {...register('mesCorte', {
                required: 'Mes Corte es obligatorio',
                min: { value: 1, message: 'Mes minimo 1' },
                max: { value: 12, message: 'Mes Maximo es 12' }
              })}
            />
            {errors.mesCorte && (
              <Form.Text className='errors' onClick={() => clearErrors('mesCorte')}>
                {errors.mesCorte.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGrdanioCorte'>
            <FormLabelStyle modedark={modedark.toString()}>Anio Corte</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='number' placeholder='eje. 2022' {...register('anioCorte', {
                required: 'Anio Corte es obligatorio',
                min: { value: 2000, message: 'Anio minimo es de 2000' },
                max: { value: 2050, message: 'Anio maximo permitido 2050' }

              })}
            />
            {errors.anioCorte && (
              <Form.Text className='errors' onClick={() => clearErrors('anioCorte')}>
                {errors.anioCorte.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row>

          <Form.Group as={Col} controlId='formGridListOrigen'>
            <FormLabelStyle modedark={modedark.toString()}>Origen Recursos</FormLabelStyle>
            <Controller
              // id='department'
              name='origen'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('origen', { required: 'Origen es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={getListOrigenRecurso}
                  // value={currentDepartment}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.origen && (
              <Form.Text className='errors' onClick={() => clearErrors('origen')}>
                {errors.origen.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGridListEstado'>
            <FormLabelStyle modedark={modedark.toString()}>Estado Obra</FormLabelStyle>
            <Controller
              // id='department'
              name='estado'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('estado', { required: 'Estado Obra es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={getListEstadoObra}
                  // value={currentDepartment}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
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
        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='Adicionar Contrato' disabled={disableBtn} loading={disableBtn} /></div>

      </Form>
    </BoxForm>
  )
}
