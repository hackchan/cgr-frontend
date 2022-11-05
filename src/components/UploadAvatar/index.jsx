import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar-edit'
import { ContainerAvatar, PreviewImage } from './styles'
export const UploadAvatar = ({ setImgBase64 }) => {
  const [src, setSrc] = useState(null)
  const [preview, setPreview] = useState(null)

  const onClose = () => {
    setPreview(null)
  }

  const onCrop = view => {
    setPreview(view)
  }
  useEffect(() => {
    setImgBase64(preview)
  }, [preview])
  return (
    <ContainerAvatar>
      <Avatar
        width={200}
        height={150}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
      />
      {preview && <PreviewImage src={preview} alt='' />}
    </ContainerAvatar>
  )
}
