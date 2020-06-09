import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
// import { styles, APP_FONT_SIZES, APP_COLORS } from '../../configs/theme'
import { shadow } from 'react-native-shadow-creator/shadow'
import Images from '@assets/images'
import { APP_SIZE, APP_RATIO } from '../../../configs/appConstants'
import { Input, AppTextBold, AppText } from '../../../components'
import { useSelector, useDispatch } from 'react-redux'
import { resetError } from '../../../redux/actions/authAction'
import { GAME_TYPES } from '../../../configs/socketConstants'
import { APP_FONT_SIZES, styles, APP_COLORS } from '../../../configs/theme'

export const WelcomeScreen = ({ socket, socketState, error }) => {
  const [form, setForm] = useState({
    gameCode: '',
    username: '',
  })
  const dispatch = useDispatch()

  const onType = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const joinGame = () => {
    let { gameCode, username } = form
    socket.emit(GAME_TYPES.GAME.JOIN, gameCode, username, null)
  }

  console.log('=========Joined==========', socketState)

  return (
    <LinearGradient
      colors={['#2AF598', '#08AEEA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        styles.center,
        { height: '100%', width: '100%', flexDirection: 'column' },
      ]}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.center,
          { height: '100%', width: '100%', flexDirection: 'column' },
        ]}>
        <View
          style={[
            { height: (APP_SIZE.heightWindow * 1) / 3, width: '100%' },
            styles.center,
            shadow(4),
          ]}>
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
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            height: APP_RATIO * 8,
          }}>
          <AppTextBold
            style={{ color: '#fff', fontSize: APP_FONT_SIZES.header }}>
            Bạn đã vào phòng
          </AppTextBold>
          <AppTextBold
            style={{ color: '#fff', fontSize: APP_FONT_SIZES.header }}>
            Đang đợi những người chơi khác
          </AppTextBold>
          <AppTextBold
            style={{ color: '#fff', fontSize: APP_FONT_SIZES.header }}>
            Hãy sẵn sàng cho cuộc thi
          </AppTextBold>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  )
}
