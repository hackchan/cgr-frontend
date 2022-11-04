import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { FormCheckStyle, ContainerSwitch } from '../../styles/Check'
import { StyledSelect } from '../../styles/select'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { ButtonLoading as Button } from '../ButtonLoading'
import { Logo } from '../Logo'

export const Update = ({ setModal, setReload, preData, data, UpdateEntidad, getSubSector, getCategorias, getMunicipios, modedark }) => {
  console.log('LA DATA JEJE:', data)
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  const [activo, setActivo] = useState(data.active)
  const [docTec, setDocTec] = useState(data.doctec)
  const [municipio, setMunicipio] = useState({ label: data.municipio.name, value: data.municipio.id })
  const [categoria, setCategoria] = useState({ label: data.categoria.name, value: data.categoria.id })
  const [subsector, setSubsector] = useState({ label: data.subsector.name, value: data.subsector.id })
  const { register, handleSubmit, control, clearErrors, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: { nit: data.nit, cgn: data.cgn, name: data.name }
  })

  const handleInputActivoChange = () => {
    setActivo(!activo)
  }
  const handleInputDocTecChange = () => {
    setDocTec(!docTec)
  }

  const loadSubSector = async (inputValue) => {
    const options = []
    const response = await getSubSector(null)
    const filter = response.data.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((SubSector) => {
      options.push({
        label: SubSector.name,
        value: SubSector.id
      })
    })
    return options
  }

  const loadCategorias = async (inputValue) => {
    const options = []
    const response = await getCategorias(null)
    console.log('response:', response)
    const filter = response.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((categoria) => {
      options.push({
        label: categoria.name,
        value: categoria.id
      })
    })
    return options
  }

  const loadMunicipios = async (inputValue) => {
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

  const onSubmit = async (dataForm) => {
    try {
      setDisableBtn(true)
      console.log('DATAFORM:', dataForm)
      dataForm.id = data.id
      dataForm = { ...dataForm, categoria: dataForm.categoria.value, municipio: dataForm.municipio.value, subsector: dataForm.subsector.value, active: activo, doctec: docTec }
      console.log('dataForm:', dataForm)
      await UpdateEntidad(dataForm, data.id)
      setModal(false)
      setReload(true)
    } catch (error) {
      if (error.response.data) {
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
                checked={docTec}
                id='switch-1'
                type='switch'
                label='documento técnico'
                onChange={handleInputDocTecChange}
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
          <Form.Group as={Col} controlId='formGridNit'>
            <FormLabelStyle modedark={modedark.toString()}>Nit</FormLabelStyle>

            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. 899999067' {...register('nit', {
                required: {
                  value: true,
                  message: 'El nit es requerido'
                },
                pattern: {
                  value: /^([0-9A-Z]{1,30})$/,
                  message: 'No es un Nit válido'
                }

              })}
            />
            {errors.nit && (
              <Form.Text className='errors' onClick={() => clearErrors('nit')}>
                {errors.nit.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGridCGN'>
            <FormLabelStyle modedark={modedark.toString()}>CGN</FormLabelStyle>

            <Form.Control
              style={{ height: 38 }} type='text' placeholder='Eje. 210205002' {...register('cgn', {
                required: {
                  value: true,
                  message: 'El cgn es requerido'
                },
                pattern: {
                  value: /^([0-9]{1,9})$/,
                  message: 'No es un CGN válido'
                }

              })}
            />
            {errors.cgn && (
              <Form.Text className='errors' onClick={() => clearErrors('nit')}>
                {errors.cgn.message}
              </Form.Text>
            )}

          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridName'>
            <FormLabelStyle modedark={modedark.toString()}>Nombre</FormLabelStyle>
            <Form.Control style={{ height: 38 }} type='text' placeholder='Nombre de la entidad' {...register('name', { required: 'Nombre de la entidad es obligatorio' })} />

            {errors.name && (
              <Form.Text className='errors' onClick={() => clearErrors('name')}>
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        <Row>

          <Form.Group as={Col} controlId='formGridMunicipoios'>
            <FormLabelStyle modedark={modedark.toString()}>municipio</FormLabelStyle>
            <Controller
              // id='department'
              defaultValue={municipio}
              name='municipio'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('municipio', { required: 'Municipio es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={loadMunicipios}
                  value={municipio}
                  onChange={(e) => { onChange(e); setMunicipio(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.municipio && (
              <Form.Text className='errors' onClick={() => clearErrors('municipio')}>
                {errors.municipio.message}
              </Form.Text>
            )}

          </Form.Group>
        </Row>

        <Row className='mb-3'>

          <Form.Group as={Col} controlId='formGridCategoria'>
            <FormLabelStyle modedark={modedark.toString()}>Categoria</FormLabelStyle>
            <Controller
              // id='department'
              defaultValue={categoria}
              name='categoria'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('categoria', { required: 'categoria es obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={loadCategorias}
                  value={categoria}
                  onChange={(e) => { onChange(e); setCategoria(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.categoria && (
              <Form.Text className='errors' onClick={() => clearErrors('categoria')}>
                {errors.categoria.message}
              </Form.Text>
            )}

          </Form.Group>

          <Form.Group as={Col} controlId='formGridTipo'>
            <FormLabelStyle modedark={modedark.toString()}>Subsector</FormLabelStyle>
            <Controller
              // id='department'
              defaultValue={subsector}
              name='subsector'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, ref, ...field } }) => (
                <StyledSelect
                  {...field}
                  innerRef={ref}
                  {...register('subsector', { required: 'subsector obligatorio' })}
                  isClearable
                  classNamePrefix='Select'
                // autoload={false}
                  placeholder='Selecciona...'
                  defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                  loadOptions={loadSubSector}
                  value={subsector}
                  onChange={(e) => { onChange(e); setSubsector(e) }}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.subsector && (
              <Form.Text className='errors' onClick={() => clearErrors('subsector')}>
                {errors.subsector.message}
              </Form.Text>
            )}

          </Form.Group>

        </Row>
        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <Button modedark={modedark} value='Actualizar Entidad' disabled={disableBtn} loading={disableBtn} />
        {/* <Button variant='primary' type='submit'>
          Submit
        </Button> */}
      </Form>

    </BoxForm>
  )
}
