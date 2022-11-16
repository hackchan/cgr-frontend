import React, { useState, useCallback, useRef } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { StyledSelect } from '../../styles/select'
import { AsyncPaginateStyled } from '../../styles/paginate'

// const Input = (props) => <components.Input {...props} isHidden={false} />
export const Register = ({
  setModalShow, setReload, preData, AddMatrizIes, GetEntidad, getDepartments, GetMunicipiosByDepartment, GetTipodDocs, GetSemestres,
  GetEstratos, user, modedark
}) => {
  const ref = useRef()
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [errorMuniSede, setErrorMuniSede] = useState('')
  const [errorMuniResidencia, setErrorMuniResidencia] = useState('')
  const [isUserEntidad] = useState(user.tipo.name === 'ENTIDAD')

  const [departmentSel] = useState('')
  const [muni, setMuni] = useState('')

  const [departIdSede, setDepartIdSede] = useState('')
  const [departIdReside, setDepartIdReside] = useState('')
  const [municipioSelSede, setMunicipioSelSede] = useState('')
  const [municipioSelReside, setMunicipioSelReside] = useState('')
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange'
  })
  const handleDepartsSede = (e) => {
    setMunicipioSelSede('')
    if (e) {
      setDepartIdSede(e.value)
    }
  }

  const handleMunicipiosSede = async (e) => {
    if (e) {
      setMunicipioSelSede(e)
    }
  }

  const handleDepartsReside = (e) => {
    setMunicipioSelReside('')
    if (e) {
      setDepartIdReside(e.value)
    }
  }

  const handleMunicipiosReside = async (e) => {
    if (e) {
      setMunicipioSelReside(e)
    }
  }

  const extendedLoadOptionsSede = useCallback(
    async (search, prevOptions) => {
      const result = await getListMunicipios(search, prevOptions, departIdSede, muni, municipioSelSede)
      return result
    },
    [departIdSede, muni, municipioSelSede]
  )

  const extendedLoadOptionsReside = useCallback(
    async (search, prevOptions) => {
      const result = await getListMunicipios(search, prevOptions, departIdReside, muni, municipioSelReside)
      return result
    },
    [departIdReside, muni, municipioSelReside]
  )

  const getListSemestres = async (inputValue) => {
    const options = []
    const response = await GetSemestres()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((semes) => {
      options.push({
        label: semes.name,
        value: semes.id
      })
    })
    return options
  }

  const getListTipoDoc = async (inputValue) => {
    const options = []
    const response = await GetTipodDocs()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((tipodoc) => {
      options.push({
        label: tipodoc.name,
        value: tipodoc.id
      })
    })
    return options
  }

  const getListEstratos = async (inputValue) => {
    const options = []
    const response = await GetEstratos()
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((estratos) => {
      options.push({
        label: estratos.name,
        value: estratos.id
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

  const getListMunicipios = async (search, prevOptions, departId, muni, municipioSel) => {
    if (departId) {
      const options = []
      const response = await GetMunicipiosByDepartment(departId)
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
    } else return { options: [] }
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
      if (!municipioSelReside) {
        setErrorMuniResidencia('Debe seleccionar un municipio de Residencia')
        throw new Error('')
      }

      if (!municipioSelSede) {
        setErrorMuniSede('Debe seleccionar un municipio de Sede')
        throw new Error('')
      }
      dataForm = {
        ...dataForm,
        userOper: user.id,
        tipoDoc: dataForm.tipoDoc.value,
        semestre: dataForm.semestre.value,
        estrato: dataForm.estrato.value,
        semestreReportado: Number(dataForm.semestreReportado),
        codigo: dataForm.codigo,
        documento: dataForm.documento,
        diaCorte: Number(dataForm.diaCorte),
        mesCorte: Number(dataForm.mesCorte),
        anioCorte: Number(dataForm.anioCorte),
        creditos: Number(dataForm.creditos),
        entidad: isUserEntidad ? user.entidades[0].id : dataForm.entidad.value,
        residencia: municipioSelReside.value,
        sede: municipioSelSede.value,
        name: dataForm.name,
        programa: dataForm.programa,
        valorSemestre: Number(dataForm.valorSemestre),
        recargo: Number(dataForm.recargo),
        descuentos: Number(dataForm.descuentos),
        tipoDescuento: dataForm.tipoDescuento

        // municipioObra: municipioSel.value

      }
      delete dataForm.departamentoReside
      delete dataForm.departamentoSede
      setDisableBtn(true)
      await AddMatrizIes([dataForm])
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
            <FormLabelStyle modedark={modedark.toString()}>Codigo Estudiante</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='Eje. EST117' {...register('codigo', {
                required: 'código estudiante es obligatorio',
                pattern: {
                  value: /(^[0-9a-zA-Z]*[0-9a-zA-Z-_]*[0-9a-zA-Z]$)/,
                  message: 'No es un código estudiante válido'
                }
              })}
            />

            {errors.codigo && (
              <Form.Text className='errors' onClick={() => clearErrors('codigo')}>
                {errors.codigo.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridSemestre'>
            <FormLabelStyle modedark={modedark.toString()}>Semestre Reportado</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='Eje. 202201' {...register('semestreReportado', {
                required: 'código semestre es obligatorio',
                minLength: { value: 6, message: 'La longitud mínima es de 6 digitos' },
                maxLength: { value: 6, message: 'La longitud máxima es de 6 digitos' },
                pattern: {
                  value: /(^(20)[1-9]{1}[0-9]{1}(01|02)$)/,
                  message: 'No es un código semestre válido'
                }
              })}
            />

            {errors.semestreReportado && (
              <Form.Text className='errors' onClick={() => clearErrors('semestreReportado')}>
                {errors.semestreReportado.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPrograma'>
            <FormLabelStyle modedark={modedark.toString()}>Programa</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='Eje. DESARROLLO SOFTWARE' {...register('programa', {
                required: 'programa es obligatorio',
                minLength: { value: 3, message: 'La longitud mínima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud máxima es de 64 caracteres' },
                pattern: {
                  value: /(^[a-zA-ZÑñ. ]*[a-zA-Z-_Ññ. ]*[a-zA-ZÑñ. ]$)/,
                  message: 'programa no válido'
                }
              })}
            />
            {errors.programa && (
              <Form.Text className='errors' onClick={() => clearErrors('programa')}>
                {errors.programa.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGriCantidadCreditos'>
            <FormLabelStyle modedark={modedark.toString()}>Créditos</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='eje. 2' {...register('creditos', {
                required: 'Cantidad créditos es obligatorio',
                pattern: {
                  value: /^(([0-9])([0-9])?(\d)?|(1000))$/,
                  message: 'Numeros de créditos no valido.'
                }
              })}
            />
            {errors.creditos && (
              <Form.Text className='errors' onClick={() => clearErrors('creditos')}>
                {errors.creditos.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridTipodoc'>
            <FormLabelStyle modedark={modedark.toString()}>Tipo Documento</FormLabelStyle>
            <Controller
              name='tipoDoc'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('tipoDoc', { required: 'Tipo Documento es obligatorio' })}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  loadOptions={getListTipoDoc}
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.tipoDoc && (
              <Form.Text className='errors' onClick={() => clearErrors('tipoDoc')}>
                {errors.tipoDoc.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGrididDocumento'>
            <FormLabelStyle modedark={modedark.toString()}>Documento</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='eje. 985478512' {...register('numeroDoc', {
                required: 'Documento es obligatorio',
                pattern: {
                  value: /^([0-9A-Za-z]{1,30})$/,
                  message: 'No es un documento válido'
                }
              })}
            />
            {errors.numeroDoc && (
              <Form.Text className='errors' onClick={() => clearErrors('numeroDoc')}>
                {errors.numeroDoc.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridestrato'>
            <FormLabelStyle modedark={modedark.toString()}>Estrato</FormLabelStyle>
            <Controller
              name='estrato'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('estrato', { required: 'Estrato es obligatorio' })}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListEstratos}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.estrato && (
              <Form.Text className='errors' onClick={() => clearErrors('estrato')}>
                {errors.estrato.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGridNombre'>
            <FormLabelStyle modedark={modedark.toString()}>Nombres y Apellidos</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='Eje. FABIO ANTONIO ROJAS MARTHA' {...register('name', {
                required: 'nombres y apellidos es obligatorio',
                minLength: { value: 3, message: 'La longitud mínima es de 5 caracteres' },
                maxLength: { value: 64, message: 'La longitud máxima es de 64 caracteres' },
                pattern: {
                  value: /(^[a-zA-ZÑñ ]*[a-zA-Z-_Ññ ]*[a-zA-ZÑñ ]$)/,
                  message: 'nombres y apellidos no válido'
                }
              })}
            />
            {errors.name && (
              <Form.Text className='errors' onClick={() => clearErrors('name')}>
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridListdepartamentoSede'>
            <FormLabelStyle modedark={modedark.toString()}>Departamento Sede</FormLabelStyle>
            <Controller
              defaultValue={departmentSel}
              name='departamentoSede'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  value={departmentSel}
                  {...field}
                  innerRef={ref}
                  {...register('departamentoSede', { required: 'departamento Sede es requerido' })}
                  noOptionsMessage={() => 'No se encontraron opciones'}
                  placeholder='Selecciona...'
                  defaultOptions
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  classNamePrefix='Select'
                  loadOptions={getListDepartamentos}
                  onChange={(e) => { onChange(e); handleDepartsSede(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.departamentoSede && (
              <Form.Text className='errors' onClick={() => clearErrors('departamentoSede')}>
                {errors.departamentoSede.message}
              </Form.Text>
            )}

          </Form.Group>
          <Form.Group as={Col} controlId='formGridListMunicipio'>
            <FormLabelStyle modedark={modedark.toString()}>Municipio Sede</FormLabelStyle>
            <AsyncPaginateStyled
              required
              value={municipioSelSede}
              selectRef={ref}
              classNamePrefix='Select'
              defaultOptions
              placeholder='Selecciona...'
              getOptionLabel={e => e.value + ' ' + e.label}
              getOptionValue={e => e.value}
              loadOptions={extendedLoadOptionsSede}
              cacheUniqs={[departIdSede, muni, municipioSelSede]}
              shouldLoadMore={(scrollHeight, clientHeight, scrollTop) => {
                return scrollHeight - scrollTop < 1000
              }}
              onChange={(e) => {
                handleMunicipiosSede(e)
              }}
              onInputChange={(e) => { setMuni(e) }}
            />
            {errorMuniSede && clearMessage(5000, setErrorMuniSede) && <p><span className='errors'>{errorMuniSede}</span></p>}

          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridListdepartamentoObra'>
            <FormLabelStyle modedark={modedark.toString()}>Departamento Reside</FormLabelStyle>
            <Controller
              defaultValue={departmentSel}
              name='departamentoReside'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  value={departmentSel}
                  {...field}
                  innerRef={ref}
                  {...register('departamentoReside', { required: 'departamento en que reside es requerido' })}
                  noOptionsMessage={() => 'No se encontraron opciones'}
                  placeholder='Selecciona...'
                  defaultOptions
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  classNamePrefix='Select'
                  loadOptions={getListDepartamentos}
                  onChange={(e) => { onChange(e); handleDepartsReside(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.departamentoReside && (
              <Form.Text className='errors' onClick={() => clearErrors('departamentoReside')}>
                {errors.departamentoReside.message}
              </Form.Text>
            )}

          </Form.Group>
          <Form.Group as={Col} controlId='formGridListMunicipio'>
            <FormLabelStyle modedark={modedark.toString()}>Municipio Reside</FormLabelStyle>
            <AsyncPaginateStyled
              required
              value={municipioSelReside}
              selectRef={ref}
              classNamePrefix='Select'
              defaultOptions
              placeholder='Selecciona...'
              getOptionLabel={e => e.value + ' ' + e.label}
              getOptionValue={e => e.value}
              loadOptions={extendedLoadOptionsReside}
              cacheUniqs={[departIdReside, muni, municipioSelReside]}
              shouldLoadMore={(scrollHeight, clientHeight, scrollTop) => {
                return scrollHeight - scrollTop < 1000
              }}
              onChange={(e) => {
                handleMunicipiosReside(e)
              }}
              onInputChange={(e) => { setMuni(e) }}
            />
            {errorMuniResidencia && clearMessage(5000, setErrorMuniResidencia) && <p><span className='errors'>{errorMuniResidencia}</span></p>}

          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridSemestre'>
            <FormLabelStyle modedark={modedark.toString()}>Semestre</FormLabelStyle>
            <Controller
              name='semestre'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('semestre', { required: 'semestre es obligatorio' })}
                  isClearable
                  defaultOptions
                  placeholder='Selecciona...'
                  getOptionLabel={e => e.value + ' ' + e.label}
                  getOptionValue={e => e.value}
                  loadOptions={getListSemestres}
                  onChange={(e) => { onChange(e) }}
                  onBlur={onBlur}
                  classNamePrefix='Select'
                />
              )}
            />
            {errors.semestre && (
              <Form.Text className='errors' onClick={() => clearErrors('semestre')}>
                {errors.semestre.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorSemestre'>
            <FormLabelStyle modedark={modedark.toString()}>Valor Semestre</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='eje. 1000364540.00' {...register('valorSemestre', {
                required: 'valor Semestre es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor de semestre válido'
                }
              })}
            />
            {errors.valorSemestre && (
              <Form.Text className='errors' onClick={() => clearErrors('valorSemestre')}>
                {errors.valorSemestre.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridrecargo'>
            <FormLabelStyle modedark={modedark.toString()}>Recargo</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='eje. 1000364540.00' {...register('recargo', {
                required: 'valor de Recargo es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor de recargo válido'
                }
              })}
            />
            {errors.recargo && (
              <Form.Text className='errors' onClick={() => clearErrors('recargo')}>
                {errors.recargo.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridvalorDescuento'>
            <FormLabelStyle modedark={modedark.toString()}>Descuentos</FormLabelStyle>
            <Form.Control
              style={{ height: 46 }} type='text' placeholder='eje. 1000364540.00' {...register('descuentos', {
                required: 'valor de Descuentos es obligatorio',
                minLength: { value: 1, message: 'el valor minimo es de 0' },
                maxLength: { value: 16, message: 'el valor maximo es de 9999999999999.99' },
                pattern: {
                  value: /^[0-9]{1,13}(\.[0-9]{1,2})?$/,
                  message: 'No es un valor de descuentos válido'
                }
              })}
            />
            {errors.descuentos && (
              <Form.Text className='errors' onClick={() => clearErrors('descuentos')}>
                {errors.descuentos.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row>

          <Form.Group as={Col} controlId='formGridObjetoProyecto'>
            <FormLabelStyle modedark={modedark.toString()}>Tipo Descuento</FormLabelStyle>
            <Form.Control
              as='textarea' rows={6} placeholder='Eje. Adicional 10% financiación condonable población discapacitada' {...register('tipoDescuento', {
                required: 'Tipo Descuento es obligatorio',
                minLength: { value: 2, message: 'La longitud mínima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud máxima es de 300 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-ZÀ-ÿÑñ.%,\r\n ]*[0-9a-zA-ZÀ-ÿ-_Ññ.$,\r\n ]*[0-9a-zA-ZÀ-ÿÑñ.$,\r\n ]$)/,
                  message: 'No es un Tipo Descuento válido'
                }
              })}
            />

            {errors.tipoDescuento && (
              <Form.Text className='errors' onClick={() => clearErrors('tipoDescuento')}>
                {errors.tipoDescuento.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGrdiaCorte'>
            <FormLabelStyle modedark={modedark.toString()}>Dia Corte</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='eje. 1' {...register('diaCorte', {
                required: 'Da Corte es obligatorio',
                min: { value: 1, message: 'Dia mínimo es 1' },
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
                min: { value: 1, message: 'Mes mínimo 1' },
                max: { value: 12, message: 'Mes máximo es 12' }
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
                required: 'Anio corte es obligatorio',
                min: { value: 2000, message: 'Anio mínimo es de 2000' },
                max: { value: 2050, message: 'Anio máximo permitido 2050' }

              })}
            />
            {errors.anioCorte && (
              <Form.Text className='errors' onClick={() => clearErrors('anioCorte')}>
                {errors.anioCorte.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>
        <Row />

        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='Adicionar Matricula' disabled={disableBtn} loading={disableBtn} /></div>
      </Form>
    </BoxForm>
  )
}
