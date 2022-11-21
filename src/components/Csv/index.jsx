import React, { useState } from 'react'
import {
  useCSVReader, lightenDarkenColor,
  formatFileSize
} from 'react-papaparse'
import { FileZone, InfoZone, SizeZone, NameZone, ProgressBarZone, Zone, RemoveZone } from './styles'

const GREY = '#CCC'
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919'
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
)
const GREY_DIM = '#686868'
const styles = {

  zoneHover: {
    borderColor: GREY_DIM
  },
  default: {
    borderColor: GREY
  }
}

export const Csv = () => {
  const [zoneHover, setZoneHover] = useState(false)
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  )
  const { CSVReader } = useCSVReader()
  const uploadAccepts = (results) => {
    setZoneHover(false)
  }

  return (
    <CSVReader
      config={{ header: true }}
      onUploadAccepted={uploadAccepts}
      onDragOver={(event) => {
        event.preventDefault()
        setZoneHover(true)
      }}
      onDragLeave={(event) => {
        event.preventDefault()
        setZoneHover(false)
      }}
      // noClick
      // noDrag
    >
      {({
        file,
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove

      }) => (
        <>
          <Zone
            {...getRootProps()}
            style={Object.assign(
              {},
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile
              ? (
                <>
                  <FileZone>
                    <InfoZone>
                      <SizeZone>
                        {formatFileSize(acceptedFile.size)}
                      </SizeZone>
                      <NameZone>{acceptedFile.name}</NameZone>
                    </InfoZone>
                    <ProgressBarZone>
                      <ProgressBar />
                    </ProgressBarZone>
                    <RemoveZone
                      {...getRemoveFileProps()}
                      onMouseOver={(event) => {
                        event.preventDefault()
                        setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT)
                      }}
                      onMouseOut={(event) => {
                        event.preventDefault()
                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR)
                      }}
                    >
                      <Remove color={removeHoverColor} />
                    </RemoveZone>
                  </FileZone>
                </>
                )
              : (
                  'Suelte el archivo CSV aquí o haga clic para cargar'
                )}
          </Zone>
        </>
      )}
    </CSVReader>
  )
}
