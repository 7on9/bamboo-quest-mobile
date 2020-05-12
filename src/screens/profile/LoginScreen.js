import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles, APP_FONT_SIZES } from '../../configs/theme'
import Images from '@assets/images'
import { APP_SIZE, APP_RATIO } from '../../configs/appConstants'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AppTextBold } from '../../components'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Fumi } from 'react-native-textinput-effects'
import { Input } from '../../components'

export const LoginScreen = () => {
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={['#2AF598', '#08AEEA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.center,
          { height: '100%', width: '100%', flexDirection: 'column' },
        ]}>
        <View
          style={[{ flex: 4, height: '100%', width: '100%' }, styles.center]}>
          <Image
            source={Images.fullLogo}
            style={{
              tintColor: '#fff',
              height: APP_SIZE.heightWindow / 2,
              width: APP_SIZE.widthWindow / 1.5,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={[
            styles.center,
            {
              flex: 1,
              height: '100%',
              width: APP_SIZE.widthWindow - APP_RATIO * 2,
              marginVertical: -APP_RATIO * 3
            },
          ]}>
          <Input
            label="Email"
            iconClass={FontAwesomeIcon}
            iconName="at"
            numberOfLines={1}
            textContentType="password"
            inputPadding={APP_RATIO * 2.25}
            autoFocus={false}
            secureTextEntry={true}
            // height={APP_RATIO*3.5}
          />
        </View>
        <View
          style={[
            styles.center,
            {
              flex: 1,
              width: APP_SIZE.widthWindow - APP_RATIO * 2,
            },
          ]}>
          <Input
            label="Mật khẩu"
            iconClass={FontAwesomeIcon}
            iconName="lock"
            numberOfLines={1}
            textContentType="password"
            inputPadding={APP_RATIO * 2.25}
            autoFocus={false}
            secureTextEntry={true}
            // height={APP_RATIO*3.5}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity style={{}}>
            <AppTextBold>Đăng nhập</AppTextBold>
          </TouchableOpacity>
          <TouchableOpacity>
            <AppTextBold>Đăng ký</AppTextBold>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}
