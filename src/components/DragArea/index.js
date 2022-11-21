import React, { useState } from 'react'
import { BoxFile, WrapFile, InputFile, MessageFile, ImageWrapper, Image } from './styles'
import Papa from 'papaparse'
export const DragArea = () => {
  const [file, setFile] = useState('')
  const [name, setName] = useState('')
  const [errors, setErros] = useState('')
  const [parsedCsvData, setParsedCsvData] = useState([])

  const parseFile = (file) => {
    Papa.parse(file, {
      worker: true,
      header: false,
      step: (results) => {
        setParsedCsvData(results.data)
      }
    })
  }

  const changeImage = (e) => {
    try {
      setErros('')
      setName('')
      const { name, type, size } = e.target.files[0]
      if (type !== 'text/csv') {
        throw new Error('Solo se permite archivos de tipo text/csv')
      }
      const reader = new window.FileReader()
      reader.readAsText(e.target.files[0], 'UTF-8')
      reader.onload = (e) => {
        const text = e.target.result
        console.log(text)
        parseFile(text)
        setFile(e.target.result)
        setName(name)
      }
    } catch (error) {
      setErros('Solo se permite archivos de tipo text/csv')
    }
  }
  return (
    <BoxFile>
      <WrapFile>
        <InputFile
          type='file'
          name='file'
          id='file'
          accept='.csv'
          placeholder='cargar csv'
          required
          onChange={(e) => {
            changeImage(e)
          }}
        />
        <MessageFile className='text-information'>
          <h3>Arrastre y suelte un archivo o seleccione Agregar CSV</h3>
        </MessageFile>
      </WrapFile>
      <ImageWrapper>
        <Image src={file} />
        <span>{name}</span>
      </ImageWrapper>
      <p>{parsedCsvData[0]}</p>
      {errors && <span className='errors'>{errors}</span>}
    </BoxFile>
  )
}
