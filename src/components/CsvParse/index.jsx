import React, { useState, useRef } from 'react'
import Papa from 'papaparse'
import { InputFile, DragArea, WrapFile, FileLoaded, IcoClose, WrapTable } from './styles'
import { GrDocumentCsv } from 'react-icons/gr'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading'
export const CsvParser = () => {
  const navigate = useNavigate()
  const inputRef = useRef()
  const [file, setFile] = useState(false)
  const [nameFile, setNameFile] = useState('')
  const [sizeFile, setSizeFile] = useState('')
  const [dataJson, setDataJson] = useState('')

  const [tableRows, setTableRows] = useState([])
  const [tableColumns, setTableColumns] = useState([])
  // const TableInput = props => {
  //   console.log('TableInput', props)
  //   const { column, row, cell, updateData } = props
  //   const onChange = e => updateData(row.index, column.id, e.target.value)
  //   return <input type='number' value={cell.value} onChange={onChange} />
  // }
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
        // step: function (results) {
        //   console.log(results.data)

        //   if (results.errors.length === 0) {
        //     setMatrix(...matrix, results.data)
        //   }
        // },
        // transform: function () {
        //   console.log('entro tranform')
        //   console.log(val)
        // }
        complete: function (result) {
          const data = result.data
          const headersArray = result.meta.fields
          console.log('HEADERS:', headersArray)
          console.log('data:', data)
          setDataJson(result.data)
          const headersTable = headersArray.map((header) => {
            return { Header: header, Footer: header, accessor: header }
          })
          console.log('headersTable:', headersTable)

          setTableRows(data)
          setTableColumns(headersTable)
          navigate('/load-table', { replace: true, state: { data: result.data, header: headersTable } })
        },
        error: (error) => window.alert(error),
        beforeFirstChunk: () => {
          // Start loader
          console.log('loading...')
        }

      })
    }

    if (file) { reader.readAsText(file) }
    // console.log('test', inputRef.current.value)
    // Papa.parse(inputRef.current.value, {
    //   delimiter: '',
    //   chunkSize: 3,
    //   header: false,
    //   complete: function (responses) {
    //     console.log(responses.data.length, responses)
    //   }
    // })
  }

  const onCloseFile = (e) => {
    inputRef.current.value = ''
    setFile(false)
    // setDataJson(null)
  }
  const handleChange = (e) => {
    try {
      console.log('entro')
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

        <Button color='hotpink' size={15} className={!file && 'btnoff'} value='open csv' onClick={handleUploadCSV} />

        {/* <button onClick={importCSV}>Click Me</button> */}
      </DragArea>
      {/* <WrapTable>

        {dataJson && <TableData
          columnJson={tableColumns} dataJson={tableRows} style={{ background: 'red' }}
                     />}
      </WrapTable> */}

    </>

  )
}
