import React, { useState } from 'react'

export const UploadPDF = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [isSelected, setIsSelected] = useState()
  //   const [isFilePicked, setIsFilePicked] = useState(false)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsSelected(true)
  }

  const handleSubmission = () => {
  }

  return (
    <div>
      <input type='file' name='file' onChange={changeHandler} />
      {isSelected
        ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
          )
        : (
          <p>Select a file to show details</p>
          )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  )
}
