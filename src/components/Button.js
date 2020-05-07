import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { APP_RATIO } from '../configs/appConstants'
import { styles } from '../configs/theme'

export const AppButton = props => {
  return (
      <TouchableOpacity {...props} style={[styles.card, { ...props.style, borderRadius: APP_RATIO/4, }]}>
        {props.children}
      </TouchableOpacity>
  )
}

/**
 * 
 * @param {{
    style: import('react-native').TouchableOpacityStyle
 }} props 
 */
export const AppButtonBold = props => {
  return (
    <TouchableOpacity {...props} style={props.style}>
      {props.children}
    </TouchableOpacity>
  )
}