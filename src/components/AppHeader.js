import React, { useState, useEffect, useMemo } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { APP_SIZE, APP_RATIO, headerHeight } from '../configs/appConstants'
import { styles, APP_COLORS, APP_FONT_SIZES } from '../configs/theme'
// import { shadow } from 'react-native-shadow-creator/shadow'
import { Header } from '../components'
import _ from 'lodash'
import DeviceInfo from 'react-native-device-info'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

export const AppHeader = ({ title, hasBackButton }) => {
  const navigation = useNavigation()
  return (
    <Header
      style={{
        height: headerHeight,
        paddingBottom: APP_RATIO / 2,
        // opacity: 0.5,
      }}
      backgroundColor={APP_COLORS.main}>
      <View
        style={([styles.center, styles.container], { flexDirection: 'row' })}>
        {hasBackButton ? <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'flex-end',
            height: '100%',
            alignItems: 'center',
            flex: 1,
            // backgroundColor: 'blue'
          }}>
          <Icon name="chevron-left" color="#fff" size={24} />
        </TouchableOpacity> : <View style={{ flex: 1 }}/> }
        <View
          style={{
            flex: 9,
            marginTop: DeviceInfo.hasNotch() ? APP_SIZE.statusBarHeight : 0,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: APP_SIZE.widthWindow / 9,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: APP_FONT_SIZES.header,
              fontFamily: 'OpenSans-Bold',
              color: '#fff',
              width: APP_SIZE.widthWindow / 1.5,
              textAlign: 'center',
            }}>
            {title || 'Bamboo Quest'}
          </Text>
        </View>
      </View>
    </Header>
  )
}