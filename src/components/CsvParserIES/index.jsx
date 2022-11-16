import React, { useState, useRef } from 'react'
import Papa from 'papaparse'
import { InputFile, DragArea, WrapFile, FileLoaded, IcoClose } from './styles'
import { ButtonLoading as Button } from '../ButtonLoading'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, Controller } from 'react-hook-form'
import { BoxForm, FormLabelStyle } from '../../styles/box'
import { StyledSelect } from '../../styles/select'
import { MatrizIESError } from '../CsvTableErrorIES'

export const CsvParserIES = ({
  setModalCsv,
  setReload,
  preData,
  MatrizCargada,
  GetEntidad,
  user,
  modedark
}) => {
  const inputRef = useRef()
  const [file, setFile] = useState(false)
  const [nameFile, setNameFile] = useState('')
  const [sizeFile, setSizeFile] = useState('')
  const [error, setError] = useState('')
  const [isUserEntidad] = useState(user.tipo.name === 'ENTIDAD')
  // const [errorDetail, setErrorDetail] = useState([])
  const [disableBtn, setDisableBtn] = useState(false)
  const [data, setData] = useState([])
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange'
  })

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
  const handleUploadCSV = (entidadId) => {
    const input = inputRef?.current
    const reader = new window.FileReader()
    const [file] = input.files

    reader.onloadend = ({ target }) => {
      Papa.parse(target.result, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: 'greedy',
        delimiter: '|',
        transform: (val, col) => {
          if (
            col === 'codigo' ||
            col === 'name' ||
            col === 'numeroDoc' ||
            col === 'programa' ||
            col === 'tipoDescuento'

          ) {
            return val.toString()
          } else if (
            col === 'semestreReportado' ||
            col === 'creditos' ||
            col === 'diaCorte' ||
            col === 'mesCorte' ||
            col === 'anioCorte' ||
            col === 'entidad' ||
            col === 'sede' ||
            col === 'semestre' ||
            col === 'tipoDoc' ||
            col === 'residencia' ||
            col === 'estrato'
          ) {
            if (!isNaN(parseInt(val))) {
              return parseInt(val)
            } else {
              return val
            }
          } else if (
            col === 'valorSemestre' ||
            col === 'recargo' ||
            col === 'descuentos'
          ) {
            if (!isNaN(parseFloat(val))) {
              return parseFloat(val)
            } else {
              return val
            }
          } else return val
        },

        complete: async function (result) {
          try {
            const headerValid = [
              'semestreReportado',
              'codigo',
              'name',
              'tipoDoc',
              'numeroDoc',
              'programa',
              'sede',
              'semestre',
              'valorSemestre',
              'recargo',
              'descuentos',
              'tipoDescuento',
              'residencia',
              'creditos',
              'estrato',
              'diaCorte',
              'mesCorte',
              'anioCorte'
            ]
            const headerFile = result.meta.fields
            console.log('EL USER ID:', user)
            console.log('headerValid:', headerValid)
            console.log('headerFile:', headerFile)
            if (JSON.stringify(headerValid) !== JSON.stringify(headerFile)) {
              throw new Error('No es el formato de csv solicitado.')
            }
            // headerValid.map((campo)==>{})
            // console.log('result:', result.meta.fields)

            const csvArray = result.data.map((row) => {
              return { ...row, entidad: entidadId, userOper: user.id }
            })
            setData(csvArray)
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
      })
    }

    if (file) {
      reader.readAsText(file)
    }
  }

  const onCloseFile = (e) => {
    // inputRef.current.value = ''
    setFile(false)
    setError('')
    setData([])
  }
  const handleChange = (e) => {
    try {
      setError('')
      const {
        target: { files }
      } = e
      const file = files[0]
      setFile(true)
      const { name, type, size } = file
      setNameFile(name)
      setSizeFile(size)
      console.log('type:', size)
      if (type !== 'text/csv') {
        throw new Error('Solo se permite archivos de tipo text/csv')
      }
      if (size / 1000 >= 4000) {
        throw new Error('Solo se permite archivos de maximo 4MB')
      }
      console.log(file)
    } catch (error) {
      setFile(false)
      setError(error.message)
    }
  }
  const onSubmit = async (dataForm) => {
    try {
      console.log(dataForm)
      handleUploadCSV(isUserEntidad ? user.entidades[0].id : dataForm.entidad.value)
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
    <>
      <BoxForm modedark={modedark}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {!isUserEntidad && (
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridListEntidad'>
                <FormLabelStyle modedark={modedark.toString()}>
                  Entidad
                </FormLabelStyle>
                <Controller
                  name='entidad'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, ref, ...field } }) => (
                    <StyledSelect
                      styles={{
                        position: 'relative',
                        zIndex: 2
                      }}
                      {...field}
                      innerRef={ref}
                      {...register('entidad', {
                        required: 'Entidad es obligatorio'
                      })}
                      isClearable
                      classNamePrefix='Select'
                      placeholder='Selecciona...'
                      defaultOptions
                      loadOptions={getListEntidades}
                      onChange={(e) => {
                        onChange(e)
                      }}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.entidad && (
                  <Form.Text
                    className='errors'
                    onClick={() => clearErrors('entidad')}
                  >
                    {errors.entidad.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Row>)}

          {data.length <= 0 && (
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridListEntidad'>
                <DragArea file={file}>
                  <WrapFile file={file}>
                    <FileLoaded file={file}>
                      <p>{nameFile}</p>
                      <p>{sizeFile / 1000}KB</p>
                      <IcoClose onClick={onCloseFile} />
                    </FileLoaded>
                    <h4>Suelte el archivo CSV aquí o haga clic para cargar</h4>
                    <InputFile
                      ref={inputRef}
                      type='file'
                      onChange={handleChange}
                      accept='text/csv'
                    />
                  </WrapFile>
                </DragArea>
              </Form.Group>
            </Row>
          )}

          <div>
            {error && (
              <p>
                <span className='errors'>{error}</span>
              </p>
            )}
          </div>
          <div>
            {data.length > 0 && (
              <MatrizIESError
                data={data}
                setModalCsv={setModalCsv}
                setReload={setReload}
                MatrizCargada={MatrizCargada}
                onCloseFile={onCloseFile}
              />
            )}
          </div>
          <br />
          <div className='d-flex p-2 justify-content-center'>
            {data.length === 0 && error.length === 0 && (
              <Button
                modedark={modedark}
                value='Cargar CSV'
                disabled={disableBtn}
                loading={disableBtn}
              />
            )}
          </div>
        </Form>
      </BoxForm>
    </>
  )
}
