import React, { useContext, useState } from 'react'
import ReactSelect from 'react-select/async'
import { AppContext } from '../../contex/AppProvidercContext'
import { useForm, Controller } from 'react-hook-form'
import { LabelBox, InputText, BoxForm } from './styles'
import { ButtonLoading as Button } from '../ButtonLoading'
import { clearMessage } from '../../utils/time'
// import { clearMessage } from '../../utils/time'
import { Logo } from '../Logo'

export const Update = ({ setModal, setReload, preData, data }) => {
  const { getSatelitales, UpdateDepartment } = useContext(AppContext)
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [inputValue, setValue] = useState('')
  const [selectedValue, setSelectedValue] = useState(null)
  const { register, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: { name: data.name, latitude: data.latitude, longitude: data.longitude } })

  const handleInputChange = value => {
    setValue(value)
  }
  const handleChange = value => {
    setSelectedValue(value)
  }

  const loadOptions = async (inputValue) => {
    const options = []
    const response = await getSatelitales()
    const filter = response.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((satelital) => {
      options.push({
        label: satelital.name,
        value: satelital.id
      })
    })
    return options
  }
  const onSubmit = async (dataForm) => {
    try {
      setDisableBtn(true)
      console.log('satelitalSel:', selectedValue)
      dataForm.id = data.id
      console.log('dataForm:', dataForm)
      await UpdateDepartment(dataForm)
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
    <BoxForm>
      <div className='avatar'><Logo big /></div>
      <h2>{preData.windowsTitleUpdate}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='name'>
          Ingrese el nombre del departamento
          <InputText
            type='text' placeholder='Nombre del departamento' id='name' name='name' {...register('name', {
              required: {
                value: true,
                message: 'El nombre del departamento es requerido '
              }
              // pattern: {
              //   value: /^[A-Z0-9]$/i,
              //   message: 'No es un nombre válido'
              // }
            })}
          />
          {errors.name
            ? (
              <>
                {errors.name.type === 'required' && (
                  <p className='errors'>
                    {errors.name.message}
                  </p>
                )}
                {errors.name.type === 'pattern' && (
                  <p className='errors alert'>
                    {errors.name.message}
                  </p>
                )}
              </>
              )
            : null}
        </LabelBox>

        <LabelBox htmlFor='latitude'>
          Ingrese la latitud del departamento
          <InputText
            type='text' placeholder='Eje. 4.60971' id='latitude' name='latitude' {...register('latitude', {
              required: {
                value: true,
                message: 'La latitud es requerida'
              },
              pattern: {
                value: /^[-+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/i,
                message: 'No es un latitud válida'
              }
            })}
          />
          {errors.latitude
            ? (
              <>
                {errors.latitude.type === 'required' && (
                  <p className='errors'>
                    {errors.latitude.message}
                  </p>
                )}
                {errors.latitude.type === 'pattern' && (
                  <p className='errors alert'>
                    {errors.latitude.message}
                  </p>
                )}
              </>
              )
            : null}
        </LabelBox>
        <LabelBox htmlFor='longitude'>
          Ingrese la longitud del departamento
          <InputText
            type='text' placeholder='Eje. -74.08175' id='longitude' name='longitude' {...register('longitude', {
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
          {errors.longitude
            ? (
              <>
                {errors.longitude.type === 'required' && (
                  <p className='errors'>
                    {errors.longitude.message}
                  </p>
                )}
                {errors.longitude.type === 'pattern' && (
                  <p className='errors alert'>
                    {errors.longitude.message}
                  </p>
                )}
              </>
              )
            : null}
        </LabelBox>

        <LabelBox htmlFor='satelital'>
          Seleccione una satelital
          <Controller
            defaultValue={data?.satelital?.id}
            name='satelital'
            id='satelital'
            control={control}
            render={({ field: { value, onChange, onBlur, name, ref } }) => (
              <ReactSelect
                autoload={false}
                placeholder='Selecciona...'
                cacheOptions
                defaultOptions
                value={selectedValue}
                getOptionLabel={e => e.value + ' ' + e.label}
                getOptionValue={e => e.value}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={val => { onChange(val.value); handleChange() }}
                defaultInputValue={data?.satelital?.name}
                // onChange={val => onChange(val.value)}

                // {...field}
                // options={[
                //   { value: 'chocolate', label: 'Chocolate' },
                //   { value: 'strawberry', label: 'Strawberry' },
                //   { value: 'vanilla', label: 'Vanilla' }
                // ]}
              />
            )}
          />

        </LabelBox>

        {/* {loading && <Spinner />}
        {message && clearMessage(30000, setMessage) && <p><span className='errors'>{message}</span></p>} */}
        {/* {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>} */}
        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <Button value={preData.windowsTitleUpdate} disabled={disableBtn} loading={disableBtn} />

      </form>

    </BoxForm>
  )
}
