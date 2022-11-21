import React, { useState } from 'react'
import { StyledSelect } from '../../styles/select'
import { useForm, Controller } from 'react-hook-form'
import { LabelBox, Input, BoxForm } from '../../styles/box'
import { ButtonLoading as Button } from '../ButtonLoading'
import { clearMessage } from '../../utils/time'
// import { clearMessage } from '../../utils/time'
import { Logo } from '../Logo'

export const Update = ({ setModal, setReload, preData, data, getSatelitales, UpdateDepartment, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [inputValue, setValue] = useState('')
  const [satelital, setSatelital] = useState({ label: data.satelital.name, value: data.satelital.id })
  // const [selectedValue, setSelectedValue] = useState(null)
  const { register, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onTouched', reValidateMode: 'onChange', defaultValues: { name: data.name, latitude: data.latitude, longitude: data.longitude } })

  // const handleInputChange = value => {
  //   setValue(value)
  // }
  // const handleChange = value => {
  //   setSelectedValue(value)
  // }

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
      dataForm.id = data.id
      dataForm = { ...dataForm, satelital: dataForm.satelital.value }
      await UpdateDepartment(dataForm)
      setModal(false)
      setReload(true)
    } catch (error) {
      if (error.response) {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='name' modedark={modedark}>
          Ingrese el nombre del {preData.table}
          <Input
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

        <LabelBox htmlFor='latitude' modedark={modedark}>
          Ingrese la latitud del {preData.table}
          <Input
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
        <LabelBox htmlFor='longitude' modedark={modedark}>
          Ingrese la longitud del {preData.table}
          <Input
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

        <LabelBox htmlFor='satelital' modedark={modedark}>
          Seleccione una {preData.relationTable}
          <Controller
              // id='department'
            defaultValue={satelital}
            name='satelital'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, ref, ...field } }) => (
              <StyledSelect
                {...field}
                innerRef={ref}
                {...register('satelital', { required: 'satelital es obligatorio' })}
                isClearable
                classNamePrefix='Select'
                // autoload={false}
                placeholder='Selecciona...'
                defaultOptions
                  // getOptionLabel={e => e.value + ' ' + e.label}
                  // getOptionValue={e => e.value}
                loadOptions={loadOptions}
                value={satelital}
                onChange={(e) => { onChange(e); setSatelital(e) }}
                onBlur={onBlur}
              />
            )}
          />
          {errors.satelital && (
            <p><span className='errors'>{errors.satelital.message}</span></p>
          )}

        </LabelBox>

        {/* {loading && <Spinner />}
        {message && clearMessage(30000, setMessage) && <p><span className='errors'>{message}</span></p>} */}
        {/* {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>} */}
        <div>
          {error && clearMessage(5000, setError) && <div className='errors'>{error}</div>}
        </div>
        <br />
        <Button modedark={modedark} value={preData.update} disabled={disableBtn} loading={disableBtn} />

      </form>

    </BoxForm>
  )
}
