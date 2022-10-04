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
export const Register = ({ setModalShow, setReload, preData, AddMatrizObra, GetSectorObra, GetOrigenRecursoObra, GetEstadoObra, GetEntidad, getDepartments, getMunicipios, GetMunicipiosByDepartment, GetDepartamentoByIdMunicipio, modedark }) => {
  const ref = useRef()
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [errorMuni, setErrorMuni] = useState('')
  const [departId, setDepartId] = useState('')
  const [departmentSel] = useState('')
  const [muni, setMuni] = useState('')
  const [municipioSel, setMunicipioSel] = useState('')
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange'
  })
  const handleDeparts = (e) => {
    setMunicipioSel('')
    if (e) {
      setDepartId(e.value)
    }
  }

  const handleMunicipios = async (e) => {
    if (e) {
      setMunicipioSel(e)
    }
  }

  const extendedLoadOptions = useCallback(
    async (search, prevOptions) => {
      const result = await getListMunicipios(search, prevOptions, departId, muni, municipioSel)
      return result
    },
    [departId, muni, municipioSel]
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
      if (!municipioSel) {
        setErrorMuni('Debe seleccionar un municipio de obra')
        throw new Error('')
      }
      dataForm = {
        ...dataForm,
        diaCorte: Number(dataForm.diaCorte),
        mesCorte: Number(dataForm.mesCorte),
        anioCorte: Number(dataForm.anioCorte),
        entidad: dataForm.entidad.value,
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
      console.log('dataForm2:', dataForm)
      setDisableBtn(true)
      await AddMatrizObra([dataForm])
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

        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridNombre'>
            <FormLabelStyle modedark={modedark.toString()}>Nombres</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. Fabio Antonio' {...register('nombres', {
                required: 'nombres son obligatorios',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[a-zA-ZÑñ ]{3,64}$)/,
                  message: 'nombres no válido'
                }
              })}
            />
            {errors.nombres && (
              <Form.Text className='errors' onClick={() => clearErrors('nombres')}>
                {errors.nombres.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridApellido'>
            <FormLabelStyle modedark={modedark.toString()}>Apellidos</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. Rojas Martha' {...register('apellidos', {
                required: 'apellidos son obligatorios',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[a-zA-ZÑñ ]{3,64}$)/,
                  message: 'apellidos no válido'
                }
              })}
            />
            {errors.apellidos && (
              <Form.Text className='errors' onClick={() => clearErrors('apellidos')}>
                {errors.apellidos.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row>

          <Form.Group as={Col} controlId='formGridPhone'>
            <FormLabelStyle modedark={modedark.toString()}>Celular</FormLabelStyle>
            <Form.Control
              type='text' placeholder='Eje. 3183895020' {...register('Celular', {
                required: 'Celular es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud maxima es de 300 caracteres' },
                pattern: {
                  value: /^(300|301|302|304|305|324|302|323|304|305|310|311|312|313|314|320|321|322|323|315|316|317|318|319|324|350|351)[0-9]{7}$/,
                  message: 'No es un numero de celular válido'
                }
              })}
            />

            {errors.Celular && (
              <Form.Text className='errors' onClick={() => clearErrors('Celular')}>
                {errors.Celular.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridEmail'>
            <FormLabelStyle modedark={modedark.toString()}>Email</FormLabelStyle>
            <Form.Control
              type='text' placeholder='Eje. 3183895020' {...register('Email', {
                required: 'Celular es obligatorio',
                minLength: { value: 2, message: 'La longitud minima es de 2 caracteres' },
                maxLength: { value: 300, message: 'La longitud maxima es de 300 caracteres' },
                pattern: {
                  value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: 'No es un email válido'
                }
              })}
            />

            {errors.Email && (
              <Form.Text className='errors' onClick={() => clearErrors('Email')}>
                {errors.Email.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridNombre'>
            <FormLabelStyle modedark={modedark.toString()}>Username</FormLabelStyle>
            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. hackchan' {...register('username', {
                required: 'Username esobligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /(^[0-9a-zA-Z-]{3,24}$)/,
                  message: 'Username no valido'
                }
              })}
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
              style={{ height: 38 }} type='password' placeholder='*******' {...register('password', {
                required: 'password esobligatorio',
                minLength: { value: 3, message: 'La longitud minima es de 3 caracteres' },
                maxLength: { value: 64, message: 'La longitud maxima es de 64 caracteres' },
                pattern: {
                  value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                  message: 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.'
                }
              })}
            />
            {errors.password && (
              <Form.Text className='errors' onClick={() => clearErrors('password')}>
                {errors.password.message}
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
