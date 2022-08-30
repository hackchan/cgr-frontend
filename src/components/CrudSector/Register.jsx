import React, { useState } from 'react'
import { ButtonLoading as Button } from '../ButtonLoading'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { clearMessage } from '../../utils/time'
import { useForm } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { Logo } from '../Logo'

export const Register = ({ setModal, setReload, preData, AddSector, modedark }) => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange'
  })

  const onSubmit = async (dataForm) => {
    try {
      setDisableBtn(true)
      await AddSector(dataForm)
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
      <h2>{preData.register}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <div className='divider' />
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='name'>
            <FormLabelStyle modedark={modedark.toString()}>Nombre del {preData.table}</FormLabelStyle>
            <Form.Control style={{ height: 38 }} type='text' placeholder='Eje: AGROPECUARIO' {...register('name', { required: `nombre del ${preData.table} obligatorio` })} />

            {errors.name && (
              <Form.Text className='errors' onClick={() => clearErrors('name')}>
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId='initial'>
            <FormLabelStyle modedark={modedark.toString()}>Nombre corto del {preData.table}</FormLabelStyle>
            <Form.Control style={{ height: 38 }} type='text' placeholder='Eje. AGRO' {...register('initial', { required: `Nombre corto ${preData.table} obligatorio` })} />

            {errors.initial && (
              <Form.Text className='errors' onClick={() => clearErrors('initial')}>
                {errors.initial.message}
              </Form.Text>
            )}
          </Form.Group>

        </Row>

        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <Button modedark={modedark} value={preData.buttonRegister} disabled={disableBtn} loading={disableBtn} />

      </Form>
    </BoxForm>
  )
}