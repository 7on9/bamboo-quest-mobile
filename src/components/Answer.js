import React from 'react'
import { StyleSheet, Modal, View, TouchableOpacity } from 'react-native'
import { APP_SIZE, APP_RATIO } from '../configs/appConstants'
import { styles, APP_FONT_SIZES } from '../configs/theme'
import { AppText, AppTextBold } from './Text'

/**
 *
 * @param {import('react-native').TouchableOpacityProps} props
 */
export const Answer = (props) => {
  const { color, label } = props
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, styles.center, { backgroundColor: color }]}>
      <AppTextBold style={{ color: '#fff', fontSize: APP_FONT_SIZES.xxLarge }}>
        {label}
      </AppTextBold>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({})
