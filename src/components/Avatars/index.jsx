import React from 'react'
import Avatar from 'avataaars'
import { generateRandomAvatarOptions } from '../../utils/ramdonAvatar'
export const Avatars = ({ ...props }) => {
  return (
    <>
      <Avatar {...props} avatarStyle='Circle' {...generateRandomAvatarOptions()} />
    </>
  )
}
