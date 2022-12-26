import React, { useState } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'

import { Logo } from '../Logo'

export const Update = ({ setModal, setReload, preData, data, UpdateClaseContrato, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: data.name,
      initial: data.initial

    }
  })

  const onSubmit = async (dataForm) => {
    try {
      setDisableBtn(true)
      await UpdateClaseContrato(dataForm, data.id)
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
      <div className='avatar'><Logo big /></div>
      <h2>{preData.update}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <div className='divider' />
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='name'>
            <FormLabelStyle modedark={modedark.toString()}>Nombre {preData.table}</FormLabelStyle>
            <Form.Control style={{ height: 38 }} type='text' placeholder='Eje: VIVIENDA' {...register('name', { required: `nombre del ${preData.table} obligatorio` })} />

            {errors.name && (
              <Form.Text className='errors' onClick={() => clearErrors('name')}>
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <Button modedark={modedark} value={preData.buttonUpdate} disabled={disableBtn} loading={disableBtn} />

      </Form>
    </BoxForm>
  )
}
