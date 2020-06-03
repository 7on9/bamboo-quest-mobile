import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { styles } from '../../configs/theme'
import { AppButton, AppTextBold } from '../../components'

const WarningNotLogin = () => {
  <View style={[styles.container, styles.center, ]}>
    <AppButton>
      <AppTextBold>
        Bấm vào đây để đăng nhập
      </AppTextBold>
    </AppButton>
  </View>
} 

const _CreateQuestionScreen = () => {
  return (
    <View>
      <WarningNotLogin />
    </View>
  )
}

export const CreateQuestionScreen = _CreateQuestionScreen 
