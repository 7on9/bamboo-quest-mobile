import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { styles, APP_FONT_SIZES, APP_COLORS } from '../../configs/theme'
import { shadow } from 'react-native-shadow-creator/shadow'
import Images from '@assets/images'
import { APP_SIZE, APP_RATIO } from '../../configs/appConstants'
import { Input, AppTextBold } from '../../components'
import { useSelector } from 'react-redux'

const EntryScreen = () => {
  const [form, setForm] = useState({
    gameCode: '',
    username: '',
  })

  const onType = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const [error, setError] = useState(null)
  const { errorMessage } = useSelector((state) => state.auth)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }, [error])

  useEffect(() => {
    if (!errorMessage) {
      return
    }
    setError(errorMessage)
    setTimeout(() => {
      dispatch(resetError())
    }, 1000)
  }, [errorMessage])

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
        {/* <View style={{ marginBottom: APP_RATIO }}>
            <AppTextBold style={{ fontSize: APP_RATIO * 3 }}>
              Đăng nhập
            </AppTextBold>
          </View> */}
        <View
          style={[
            styles.center,
            {
              // flex: 4,
              marginVertical: APP_RATIO / 2,
              width: APP_SIZE.widthWindow - APP_RATIO * 2,
            },
          ]}>
          <AppTextBold style={{ paddingBottom: APP_RATIO, color: '#fff' }}>
            Mã phòng
          </AppTextBold>

          <TextInput
            style={[
              {
                backgroundColor: 'white',
                height: APP_RATIO * 5,
                width: (APP_SIZE.widthWindow * 1) / 2,
                borderRadius: 3,
                // padding: APP_RATIO * 2,
                textAlign: 'center',
                fontSize: APP_FONT_SIZES.header,
              },
              shadow(6),
            ]}
            textAlignVertical="center"
            onChangeText={(e) => onType('gameCode', e)}
            returnKeyType="next"
            maxLength={20}
            numberOfLines={1}
          />
        </View>
        <View
          style={[
            styles.center,
            {
              // flex: 4,
              marginVertical: APP_RATIO / 2,
              width: APP_SIZE.widthWindow - APP_RATIO * 2,
            },
          ]}>
          <AppTextBold style={{ paddingBottom: APP_RATIO, color: '#fff' }}>
            Tên người chơi
          </AppTextBold>
          <TextInput
            style={[
              {
                backgroundColor: 'white',
                height: APP_RATIO * 5,
                width: (APP_SIZE.widthWindow * 1) / 2,
                borderRadius: 3,
                // padding: APP_RATIO * 2,
                textAlign: 'center',
                fontSize: APP_FONT_SIZES.header,
              },
              shadow(6),
            ]}
            textAlignVertical="center"
            onChangeText={(e) => onType('username', e)}
            returnKeyType="next"
            maxLength={20}
            numberOfLines={1}
          />
        </View>
        {form.gameCode.length && form.username.length ? (
          <View
            style={[
              styles.center,
              {
                // flex: 4,
                marginVertical: APP_RATIO / 2,
                width: APP_SIZE.widthWindow - APP_RATIO * 2,
              },
            ]}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: 'red', //'#ba2d0b',
                  height: APP_RATIO * 5,
                  width: (APP_SIZE.widthWindow * 1) / 2,
                  borderRadius: 3,
                  borderBottomWidth: 4,
                  borderBottomColor: 'rgba(0,0,0,0.5)',
                  borderRightWidth: 4,
                  borderRightColor: 'rgba(0,0,0,0.5)',
                  // padding: APP_RATIO * 2,
                  textAlign: 'center',
                  fontSize: APP_FONT_SIZES.header,
                },
                shadow(6),
                styles.center,
              ]}
              textAlignVertical="center">
              <AppTextBold style={{ color: '#fff' }}>THAM GIA</AppTextBold>
            </TouchableOpacity>
          </View>
        ) : null }
      </KeyboardAwareScrollView>
    </LinearGradient>
  )
}

export default EntryScreen
