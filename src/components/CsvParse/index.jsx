import React, { useState, useRef } from 'react'
import Papa from 'papaparse'
import { InputFile, DragArea, WrapFile, FileLoaded, IcoClose } from './styles'
import { Button } from '../Button'
import { clearMessage } from '../../utils/time'

export const CsvParser = ({ setModalCsv, setReload, preData, AddMatrizObra, modedark }) => {
  const inputRef = useRef()
  const [file, setFile] = useState(false)
  const [nameFile, setNameFile] = useState('')
  const [sizeFile, setSizeFile] = useState('')
  const [error, setError] = useState('')
  const [disableBtn, setDisableBtn] = useState(false)

  const handleUploadCSV = () => {
    const input = inputRef?.current
    const reader = new window.FileReader()
    const [file] = input.files

    reader.onloadend = ({ target }) => {
      Papa.parse(target.result, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        delimiter: '|',
        worker: undefined,
        complete: async function (result) {
          try {
            console.log('resul data:', result.data)
            await AddMatrizObra(result.data)
            setModalCsv(false)
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
        },
        error: (error) => window.alert(error),
        beforeFirstChunk: () => {
          // Start loader
          console.log('loading...')
        }

      })
    }

    if (file) { reader.readAsText(file) }
  }

  const onCloseFile = (e) => {
    inputRef.current.value = ''
    setFile(false)
  }
  const handleChange = (e) => {
    try {
      const { target: { files } } = e
      const file = files[0]
      setFile(true)
      const { name, type, size } = file
      setNameFile(name)
      setSizeFile(size)
      console.log('type:', size)
      if (type !== 'text/csv') {
        throw new Error('Solo se permite archivos de tipo text/csv')
      }
      console.log(file)
    } catch (error) {
      setFile(false)
      console.log(error)
    }
  }
  return (
    <>
      <DragArea file={file}>
        <WrapFile file={file}>
          <FileLoaded file={file}>
            <p>{nameFile}</p>
            <p>{sizeFile / 1000}KB</p>
            <IcoClose onClick={onCloseFile} />

          </FileLoaded>
          <h4>Suelte el archivo CSV aquí o haga clic para cargar</h4>
          <InputFile ref={inputRef} type='file' onChange={handleChange} accept='text/csv' />

        </WrapFile>
        <div>
          {error && clearMessage(5000, setError) && <p><span className='errors'>{error}</span></p>}
        </div>
        <br />
        <div className='d-flex p-2 justify-content-center'> <Button modedark={modedark} value='Adicionar Contrato' disabled={disableBtn} loading={disableBtn} onClick={handleUploadCSV} /></div>
        {/* <Button color='hotpink' size={15} className={!file && 'btnoff'} value='open csv' onClick={handleUploadCSV} /> */}

      </DragArea>

    </>

  )
}
