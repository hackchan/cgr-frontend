import React, { useEffect, useState } from 'react'
import Avatar from 'avataaars'
import { generateRandomAvatarOptions } from '../../utils/ramdonAvatar'

export const Avatars = ({ ...props }) => {
  const [options, setOptions] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const data = await generateRandomAvatarOptions()
      setOptions(data)
    }

    // call the function
    fetchData()
  }, [])
  return (
    <>
      {options && <Avatar
        {...props} avatarStyle='Circle' {...options}
                  />}

    </>
  )
}
