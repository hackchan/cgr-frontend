import React, { useState } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { Logo } from '../Logo'
import { FormCheckStyle, ContainerSwitch } from '../../styles/Check'
import { StyledSelect } from '../../styles/select'
import InputGroup from 'react-bootstrap/InputGroup'

export const Register = ({ setModal, setReload, preData, AddMatrizObra, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [currentDepartment, setcurrentDepartment] = useState('')
  const [activo, setActivo] = useState(true)
  const [capital, setCapital] = useState(false)
  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange'
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
        {/* <Row className='mb-3'>
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
        <div className='divider' /> */}
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
              <Form.Text className='errors' onClick={() => clearErrors('bpin')}>
                {errors.idContrato.message}
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
              <Form.Text className='errors' onClick={() => clearErrors('bpin')}>
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
              <Form.Text className='errors' onClick={() => clearErrors('bpin')}>
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

        </Row>
        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <Button modedark={modedark} value='Crear Municipio' disabled={disableBtn} loading={disableBtn} />
        {/* <Button variant='primary' type='submit'>
          Submit
        </Button> */}
      </Form>
    </BoxForm>
  )
}
