import React from 'react'
import { Text } from 'react-native'

export const AppText = props => {
  return (
    <Text {...props} style={{ fontFamily: 'OpenSans-Regular', ...props.style }}>
      {props.children}
    </Text>
  )
}

/**
 * 
 * @param {{
    style: import('react-native').TextStyle
 }} props 
 */
export const AppTextBold = props => {
  return (
    <Text {...props} style={{ fontFamily: 'OpenSans-Bold', ...props.style }}>
      {props.children}
    </Text>
  )
}