import React from 'react'
import { LogoCGR, RedPoint } from './styles'
export const Logo = ({ big = false }) => {
  return (
    <LogoCGR big={big}><RedPoint big={big} /></LogoCGR>
  )
}
