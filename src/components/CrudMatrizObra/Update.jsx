import React, { useState, useCallback } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { StyledSelect } from '../../styles/select'
import { AsyncPaginateStyled } from '../../styles/paginate'

export const Update = ({ setModalUpdateShow, setReload, preData, data, UpdateMatrizObra, GetSectorObra, GetOrigenRecursoObra, GetEstadoObra, GetEntidad, getDepartments, getMunicipios, GetMunicipiosByDepartment, GetDepartamentoByIdMunicipio, user, isBasicUsr, modedark }) => {
  const [isUserEntidad] = useState(isBasicUsr)
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [errorMuni, setErrorMuni] = useState('')
  const [muni, setMuni] = useState('')
  const [departmentSel, setDepartmentSel] = useState({ label: data.municipioObra.department.name, value: data.municipioObra.department.id })
  const [municipioSel, setMunicipioSel] = useState({ label: data.municipioObra.name, value: data.municipioObra.id })
  const [entidadSel, setEntidadSel] = useState({ label: data.entidad.name, value: data.entidad.id })
  const [sectorSel, setsectorSel] = useState({ label: data.sector.name, value: data.sector.id })
  const [origenRecursoSel, setOrigenRecursoSel] = useState({ label: data.origen.name, value: data.origen.id })
  const [estadoSel, setEstadoSel] = useState({ label: data.estado.name, value: data.estado.id })
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      userOper: user.id,
      anioCorte: data.anioCorte,
      avanceFinancieroEjecutado: data.avanceFinancieroEjecutado,
      avanceFisicoEjecutado: data.avanceFisicoEjecutado,
      avanceFisicoProgramado: data.avanceFisicoProgramado,
      cantidadAdiciones: data.cantidadAdiciones,
      cantidadProrrogas: data.cantidadProrrogas,
      cantidadSuspenciones: data.cantidadSuspenciones,
      diaCorte: data.diaCorte,
      fechaInicio: data.fechaInicio,
      fechaProgramadaTermina: data.fechaProgramadaTermina,
      fechaSuscripcion: data.fechaSuscripcion,
      fechaTermina: data.fechaTermina,
      id: data.id,
      idBpin: data.idBpin,
      idContratista: data.idContratista,
      idContrato: data.idContrato,
      idInterventoria: data.idInterventoria,
      idNuevoContratista: data.idNuevoContratista,
      linkSecop: data.linkSecop,
      mesCorte: data.mesCorte,
      nombreInterventoria: data.nombreInterventoria,
      nombreProyecto: data.nombreProyecto,
      nroContrato: data.nroContrato,
      nroContratoInterventoria: data.nroContratoInterventoria,
      objetoProyecto: data.objetoProyecto,
      observaciones: data.observaciones,
      razonSocialContratista: data.razonSocialContratista,
      razonSocialNuevoContratista: data.razonSocialNuevoContratista,
      tiempoProrrogas: data.tiempoProrrogas,
      tiempoSuspenciones: data.tiempoSuspenciones,
      unidadFuncional: data.unidadFuncional,
      valorAnticipo: data.valorAnticipo,
      valorComprometido: data.valorComprometido,
      valorContratoFinal: data.valorContratoFinal,
      valorContratoInicial: data.valorContratoInicial,
      valorObligado: data.valorObligado,
      valorPagado: data.valorPagado,
      valorTotalAdiciones: data.valorTotalAdiciones

    }
  })

  const extendedLoadOptions = useCallback(
    async (search, prevOptions) => {
      setDepartmentSel(departmentSel)
      const result = await getListMunicipios(search, prevOptions, municipioSel, departmentSel, muni)
      return result
    },
    [municipioSel, departmentSel, muni]
  )

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

  const getListMunicipios = async (search, prevOptions, municipioSel, departmentSel, muni) => {
    if (departmentSel) {
      const options = []
      const response = await GetMunicipiosByDepartment(departmentSel.value)
      const filter = response.data.filter((option) => {
        return option.name.toLowerCase().includes(muni.toLowerCase())
      })

      filter.forEach((muni) => {
        options.push({
          label: muni.name,
          value: muni.id
        })
      })
      return { options }
    }
    return { options: [] }
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
      if (!municipioSel) {
        setErrorMuni('Debe seleccionar un municipio de obra')
        throw new Error('')
      }
      dataForm = {
        ...dataForm,
        diaCorte: Number(dataForm.diaCorte),
        mesCorte: Number(dataForm.mesCorte),
        anioCorte: Number(dataForm.anioCorte),
        entidad: isUserEntidad ? user.entidades[0].id : dataForm.entidad.value,
        estado: dataForm.estado.value,
        origen: dataForm.origen.value,
        sector: dataForm.sector.value,
        valorTotalAdiciones: Number(dataForm.valorTotalAdiciones),
        valorComprometido: Number(dataForm.valorComprometido),
        valorObligado: Number(dataForm.valorObligado),
        valorPagado: Number(dataForm.valorPagado),
        valorAnticipo: Number(dataForm.valorAnticipo),
        cantidadSuspenciones: Number(dataForm.cantidadSuspenciones),
        cantidadProrrogas: Number(dataForm.cantidadProrrogas),
        tiempoSuspenciones: Number(dataForm.tiempoSuspenciones),
        tiempoProrrogas: Number(dataForm.tiempoProrrogas),
        cantidadAdiciones: Number(dataForm.cantidadAdiciones),
        valorContratoInicial: Number(dataForm.valorContratoInicial),
        valorContratoFinal: Number(dataForm.valorContratoFinal),
        avanceFisicoProgramado: Number(dataForm.avanceFisicoProgramado),
        avanceFisicoEjecutado: Number(dataForm.avanceFisicoEjecutado),
        avanceFinancieroEjecutado: Number(dataForm.avanceFinancieroEjecutado),
        municipioObra: municipioSel.value

      }
      delete dataForm.departamentoObra
      delete dataForm.id
      await UpdateMatrizObra(dataForm, data.id)
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
      {/* <div className='avatar'><Logo big /></div>
      <h2>{preData.update}</h2> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {!isUserEntidad &&
        (
          <Row>
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
                    {...field}
                    innerRef={ref}
                    {...register('entidad', { required: 'Entidad es obligatorio' })}
                    isClearable
                    classNamePrefix='Select'
      // autoload={false}
                    placeholder='Selecciona...'
                    defaultOptions
        // getOptionLabel={e => e.value + ' ' + e.label}
        // getOptionValue={e => e.value}
                    loadOptions={getListEntidades}
                    value={entidadSel}
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
          </Row>
        )}

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridLinkSecop'>
            <FormLabelStyle modedark={modedark.toString()}>Link Secop</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. https://www.contratos.gov.co/consultas/detalleProceso.do?numConstanc' {...register('linkSecop', {
                required: 'Link secop es obligatorio',
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: 'No es link válido'
                }
              })}
            />

            {errors.linkSecop && (
              <Form.Text className='errors' onClick={() => clearErrors('linkSecop')}>
                {errors.linkSecop.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridListSector'>
            <FormLabelStyle modedark={modedark.toString()}>Sector Obra</FormLabelStyle>
            <Controller
    // id='department'
              defaultValue={sectorSel}
              name='sector'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  value={sectorSel}
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
                  onChange={(e) => { onChange(e); setsectorSel(e) }}
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
              defaultValue={departmentSel}
              name='departamentoObra'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  value={departmentSel}
                  {...field}
                  innerRef={ref}
                  {...register('departamentoObra', { required: 'Departamento Obra es requerido' })}
                  noOptionsMessage={() => 'No se encontraron opciones'}
                  placeholder='Selecciona...'
                  defaultOptions
                  classNamePrefix='Select'
                  loadOptions={getListDepartamentos}
                  onChange={(e) => { onChange(e); setDepartmentSel(e); setMunicipioSel('') }}
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
            <AsyncPaginateStyled
              required
              value={municipioSel}
              classNamePrefix='Select'
              defaultOptions
              placeholder='Selecciona...'
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
              loadOptions={extendedLoadOptions}
              cacheUniqs={[municipioSel, departmentSel]}
              shouldLoadMore={(scrollHeight, clientHeight, scrollTop) => {
                return scrollHeight - scrollTop < 1000
              }}
              onChange={(e) => {
                setMunicipioSel(e)
              }}
              onBlur={(e) => { }}
              onInputChange={(e) => { setMuni(e) }}
            />
            {errorMuni && clearMessage(15000, setErrorMuni) && <p><span className='errors'>{errorMuni}</span></p>}

          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridBpin'>
            <FormLabelStyle modedark={modedark.toString()}>Bpin</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. 6490-788745' {...register('idBpin', {
                required: 'código bpin es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 20, message: 'La longitud maxima es de 20 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
                  message: 'No es un código bpin válido'
                }
              })}
            />

            {errors.idBpin && (
              <Form.Text className='errors' onClick={() => clearErrors('idBpin')}>
                {errors.idBpin.message}
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
              style={{ height: 38 }} type='text' placeholder='Eje. FNGRD-127 - Mejoramiento Viviendas' {...register('nombreProyecto', {
                required: 'nombre proyecto es obligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÑñ ]*[0-9a-zA-Z-_Ññ ]*[0-9a-zA-ZÑñ ]$)/,
                  message: 'No es un nombre proyecto válido'
                }
              })}
            />
            {errors.nombreProyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('nombreProyecto')}>
                {errors.nombreProyecto.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridUnidadFuncional'>
            <FormLabelStyle modedark={modedark.toString()}>Unidad Funcional</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. FNGRD-127 - Mejoramiento Viviendas' {...register('unidadFuncional', {
                required: 'Unidad funcional es obligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÑñ ]*[0-9a-zA-Z-_Ññ ]*[0-9a-zA-ZÑñ ]$)/,
                  message: 'No es un nombre unidad funcional válido'
                }
              })}
            />
            {errors.unidadFuncional && (
              <Form.Text className='errors' onClick={() => clearErrors('unidadFuncional')}>
                {errors.unidadFuncional.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row>

          <Form.Group as={Col} controlId='formGridObjetoProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Objecto Proyecto</FormLabelStyle>
            <Form.Control
              as='textarea' rows={6} placeholder='Eje. Reconstruccion de la estructura de viviendas afectadas en el departamento de Antioquia' {...register('objetoProyecto', {
                required: 'Objecto de proyecto es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud maxima es de 300 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÀ-ÿÑñ.,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.,\r\n ]$)/,
                  message: 'No es un objeto proyecto válido'
                }
              })}
            />

            {errors.objetoProyecto && (
              <Form.Text className='errors' onClick={() => clearErrors('objetoProyecto')}>
                {errors.objetoProyecto.message}
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
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaProgramadaTermina', {
                required: 'Fecha Suscripcion es obligatorio'
              })}
            />

            {errors.fechaProgramadaTermina && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaProgramadaTermina')}>
                {errors.fechaProgramadaTermina.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridFechaTerminacion'>
            <FormLabelStyle modedark={modedark.toString()}>Fecha Terminación</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='date' placeholder='eje. 2020-01-01' {...register('fechaTermina', {
                required: 'Fecha terminacion es obligatorio'
              })}
            />

            {errors.fechaTermina && (
              <Form.Text className='errors' onClick={() => clearErrors('fechaTermina')}>
                {errors.fechaTermina.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridcontratoInicial'>
            <FormLabelStyle modedark={modedark.toString()}>Valor contrato Inicial</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1000364540.00' {...register('valorContratoInicial', {
                required: 'Contrato Inicial es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.valorContratoInicial && (
              <Form.Text className='errors' onClick={() => clearErrors('valorContratoInicial')}>
                {errors.valorContratoInicial.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridcontratoFinal'>
            <FormLabelStyle modedark={modedark.toString()}>Valor contrato Final</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1500364540.00' {...register('valorContratoFinal', {
                required: 'Contrato Final es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor valido'
                }
              })}
            />
            {errors.valorContratoFinal && (
              <Form.Text className='errors' onClick={() => clearErrors('valorContratoFinal')}>
                {errors.valorContratoFinal.message}
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
              defaultValue={origenRecursoSel}
              name='origen'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  value={origenRecursoSel}
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
                  onChange={(e) => { onChange(e); setOrigenRecursoSel(e) }}
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
              defaultValue={estadoSel}
              name='estado'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  value={estadoSel}
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
                  onChange={(e) => { onChange(e); setEstadoSel(e) }}
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
        <div className='mt-4 text-center'>
          {error && clearMessage(35000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value={preData.buttonUpdate} disabled={disableBtn} loading={disableBtn} /></div>
      </Form>
    </BoxForm>
  )
}
