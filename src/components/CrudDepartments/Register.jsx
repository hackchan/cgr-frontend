import React, { useState } from 'react'
import { StyledSelect } from '../../styles/select'
import { LabelBox, Input, BoxForm } from '../../styles/box'
import { useForm, Controller } from 'react-hook-form'
import { ButtonLoading as Button } from '../ButtonLoading'
import { clearMessage } from '../../utils/time'
// import { clearMessage } from '../../utils/time'
import { Logo } from '../Logo'

export const Register = ({ setModal, setReload, preData, getSatelitales, AddDepartment, GetUserCGR, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')
  // eslint-disable-next-line no-unused-vars

  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm()

  const loadOptions = async (inputValue) => {
    const options = []
    const response = await getSatelitales()
    const filter = response.data.filter((option) => {
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

  const loadOptionsCgr = async (inputValue) => {
    const options = []
    const response = await GetUserCGR()
    const filter = response.filter((option) => {
      return option.name.toLowerCase().includes(inputValue.toLowerCase())
    })

    filter.forEach((user) => {
      options.push({
        label: `${user.name} ${user.lastName}`,
        value: user.id
      })
    })
    return options
  }
  const onSubmit = async (dataForm) => {
    try {
      dataForm = { ...dataForm, satelital: dataForm?.satelital?.value ?? null, responsable: dataForm?.responsable?.value ?? null }
      console.log('dataForm:', dataForm)
      setDisableBtn(true)
      await AddDepartment(dataForm)
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
      <h2>{preData.register}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox htmlFor='name' modedark={modedark}>
          Ingrese el nombre del {preData.table}
          <Input
            type='text' placeholder='Nombre del departamento' id='name' name='name' {...register('name', {
              required: {
                value: true,
                message: `El nombre del ${preData.table} es requerido `
              }
              // pattern: {
              //   value: /^[A-Z0-9]$/i,
              //   message: 'No es un nombre v??lido'
              // }
            })}
          />
          {errors.name
            ? (
              <>
                {errors.name.type === 'required' && (
                  <div className='errors' onClick={() => clearErrors('name')}>
                    {errors.name.message}
                  </div>
                )}
                {errors.name.type === 'pattern' && (
                  <div className='errors' onClick={() => clearErrors('name')}>
                    {errors.name.message}
                  </div>
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
                message: 'No es un latitud v??lida'
              }
            })}
          />
          {errors.latitude
            ? (
              <>
                {errors.latitude.type === 'required' && (
                  <div className='errors' onClick={() => clearErrors('latitude')}>
                    {errors.latitude.message}
                  </div>
                )}
                {errors.latitude.type === 'pattern' && (
                  <div className='errors' onClick={() => clearErrors('latitude')}>
                    {errors.latitude.message}
                  </div>
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
                message: 'No es un longitud v??lida'
              }
            })}
          />
          {errors.longitude
            ? (
              <>
                {errors.longitude.type === 'required' && (
                  <div className='errors' onClick={() => clearErrors('longitude')}>
                    {errors.longitude.message}
                  </div>
                )}
                {errors.longitude.type === 'pattern' && (
                  <div className='errors' onClick={() => clearErrors('longitude')}>
                    {errors.longitude.message}
                  </div>
                )}
              </>
              )
            : null}
        </LabelBox>

        <LabelBox htmlFor='satelital' modedark={modedark}>
          Seleccione una {preData.relationTable}
          <Controller
              // id='department'
            name='satelital'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, ref, ...field } }) => (
              <StyledSelect
                {...field}
                innerRef={ref}
                {...register('satelital', { required: 'Satelital es obligatorio' })}
                isClearable
                classNamePrefix='Select'
                // autoload={false}
                placeholder='Selecciona...'
                defaultOptions
                // getOptionLabel={e => e.value + ' ' + e.label}
                // getOptionValue={e => e.value}
                loadOptions={loadOptions}
                  // value={currentDepartment}
                onChange={(e) => { onChange(e) }}
                onBlur={onBlur}
              />
            )}
          />
          {errors.satelital && (
            <div className='errors' onClick={() => clearErrors('satelital')}>
              {errors.satelital.message}
            </div>
          )}

        </LabelBox>

        <LabelBox htmlFor='responsable' modedark={modedark}>
          Seleccione una {preData.relationTable2}
          <Controller
              // id='department'
            name='responsable'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, ref, ...field } }) => (
              <StyledSelect
                {...field}
                innerRef={ref}
                {...register('responsable', { required: 'Responsable es obligatorio' })}
                isClearable
                classNamePrefix='Select'
                // autoload={false}
                placeholder='Selecciona...'
                defaultOptions
                // getOptionLabel={e => e.value + ' ' + e.label}
                // getOptionValue={e => e.value}
                loadOptions={loadOptionsCgr}
                  // value={currentDepartment}
                onChange={(e) => { onChange(e) }}
                onBlur={onBlur}
              />
            )}
          />
          {errors.responsable && (
            <div className='errors' onClick={() => clearErrors('responsable')}>
              {errors.responsable.message}
            </div>
          )}

        </LabelBox>

        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <Button modedark={modedark} value='Crear Departamento' disabled={disableBtn} loading={disableBtn} />

      </form>

    </BoxForm>
  )
}
