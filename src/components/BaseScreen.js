import React from 'react'
import { View, Text } from 'react-native'
import { Header } from './Header'

export const BaseScreen = props => {
  return (
    <View style={{ flex: 1 }}>
      {props.header ? <props.header /> : <Header />}
      {props.children}
    </View>
  )
}
