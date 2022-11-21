import React, { useState } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { clearMessage } from '../../utils/time'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { Logo } from '../Logo'
import { StyledSelect } from '../../styles/select'
export const Register = ({ setModal, setReload, preData, AddSubSector, getSector, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, control, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange'
  })

  const onSubmit = async (dataForm) => {
    try {
      dataForm = { ...dataForm, sector: dataForm.sector.value }
      setDisableBtn(true)
      await AddSubSector(dataForm)
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

  const loadOptionsSector = async (inputValue) => {
    const options = []
    const response = await getSector(null)
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
  return (
    <BoxForm className='size' modedark={modedark}>
      <div className='avatar'><Logo big /></div>
      <h2>{preData.register}</h2>
      <Form size='lg' onSubmit={handleSubmit(onSubmit)}>

        <div className='divider' />

        <Form.Group as={Col} controlId='name'>
          <FormLabelStyle modedark={modedark.toString()}>Nombre del {preData.table}</FormLabelStyle>
          <Form.Control className='w-250' style={{ height: 38 }} type='text' placeholder='Eje: AGROPECUARIO' {...register('name', { required: `nombre del ${preData.table} obligatorio` })} />

          {errors.name && (
            <Form.Text className='errors' onClick={() => clearErrors('name')}>
              {errors.name.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId='sector'>
          <FormLabelStyle modedark={modedark.toString()}>Sector</FormLabelStyle>
          <Controller
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
                placeholder='Selecciona...'
                defaultOptions
                loadOptions={loadOptionsSector}
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

        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <Button modedark={modedark} value={preData.buttonRegister} disabled={disableBtn} loading={disableBtn} />

      </Form>
    </BoxForm>
  )
}
