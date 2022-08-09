import React from 'react'
import { AnimationLoading } from './styles'
export const Loading = ({ size = 15, color = 'white', circle = false }) => {
  return (
    <AnimationLoading size={size} color={color} circle={circle}>
      <div className='sk-fading-circle'>
        <div className='sk-circle1 sk-circle' />
        <div className='sk-circle2 sk-circle' />
        <div className='sk-circle3 sk-circle' />
        <div className='sk-circle4 sk-circle' />
        <div className='sk-circle5 sk-circle' />
        <div className='sk-circle6 sk-circle' />
        <div className='sk-circle7 sk-circle' />
        <div className='sk-circle8 sk-circle' />
        <div className='sk-circle9 sk-circle' />
        <div className='sk-circle10 sk-circle' />
        <div className='sk-circle11 sk-circle' />
        <div className='sk-circle12 sk-circle' />
      </div>
    </AnimationLoading>

  )
}
