import React from 'react'
import { View, Text, StatusBar, Platform } from 'react-native'
import { APP_SIZE } from '../configs/appConstants'
import { shadow } from 'react-native-shadow-creator/shadow'
import { APP_COLORS } from '../configs/theme'

/**
 * Render app header
 * @param {{
  backgroundColor: String,
  barStyle: 'light-conten' | 'dark-content'
}} props 
 */
export const Header = (props) => {
  return (
    <View
      style={{
        height:
          Platform.OS === 'ios'
            ? APP_SIZE.appBarHeight + APP_SIZE.statusBarHeight
            : APP_SIZE.appBarHeight,
        backgroundColor: props.backgroundColor || APP_COLORS.main,
        ...shadow(6, props.backgroundColor || APP_COLORS.main),
      }}>
      <StatusBar
        backgroundColor={props.backgroundColor || APP_COLORS.main}
        barStyle={props.barStyle || 'light-content'}
      />
      {props.children}
    </View>
  )
}
