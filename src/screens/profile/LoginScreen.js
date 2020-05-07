import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../configs/theme'
import Images from '@assets/images'
import { APP_SIZE } from '../../configs/appConstants'

export const LoginScreen = () => {
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={['#FF5714', '#B7FDFE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.center, { flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <Image
            source={Images.fullLogo}
            style={{
              height: APP_SIZE.heightWindow / 2,
              width: APP_SIZE.widthWindow / 2,
              resizeMode: 'center',
            }}
          />
        </View>
        <View style={{ flex: 1 }}></View>
      </LinearGradient>
    </View>
  )
}
