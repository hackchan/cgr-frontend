import styled from 'styled-components'
import { Edit, Delete, PlaylistAdd, Clear, Add, CloudUpload } from '@mui/icons-material'

export const EditIconStyle = styled(Edit)`
  font-size: 18px !important;
  color: gray;
  cursor: pointer;
  &:hover {
    color: #89b637;
  }
`
export const DeleteIconStyle = styled(Delete)`
  font-size: 18px !important;
  color: #772ce8;
  cursor: pointer;
  &:hover {
    color: red;
  }
`
export const PlaylistAddIconStyle = styled(PlaylistAdd)`
  font-size: 18px !important;
  color: white;
  cursor: pointer;
`
export const ClearIconStyle = styled(Clear)`
  font-size: 18px !important;
  color: white;
  cursor: pointer;
`

export const AddIconStyle = styled(Add)`
  font-size: 18px !important;
  color: white;
  cursor: pointer;
`

export const CloudUploadIconStyle = styled(CloudUpload)`
  font-size: 18px !important;
  color: white;
  cursor: pointer;
`
