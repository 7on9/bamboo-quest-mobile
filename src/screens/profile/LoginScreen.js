import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles, APP_FONT_SIZES } from '../../configs/theme'
import Images from '@assets/images'
import { APP_SIZE, APP_RATIO } from '../../configs/appConstants'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AppTextBold } from '../../components'

import { shadow } from 'react-native-shadow-creator/shadow'
import { Input } from '../../components'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest, resetError } from '../../redux/actions/authAction'
import { dataProvider } from '../../services/dataProvider'
// import { loginRequest } from '../../redux/actions/authAction'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    reTypePassword: '',
  })
  
  const [error, setError] = useState(null)
  const { errorMessage } = useSelector(state => state.auth)

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
  
  const onSubmit = async () => {
    console.log(form)
    let { name, email, password, reTypePassword } = form
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setError('Cần nhập đúng định dạng email')
      return
    }
    // if (password && password.length < 6) {
      //   setError('Mật khẩu cần dài it nhất 6 ký tự')
      //   return
      // }
      if (isRegister) {
        if (name && email && password && reTypePassword) {
          if (password != reTypePassword) {
            setError('Mật khẩu gõ lại không trùng khớp')
            return
          }
          try {
            let res = await dataProvider('/user/register', {
              method: 'POST',
              data: {
                email,
                password,
                name
              }
            })
            res = res.data
            setError('Đăng ký thành công. Hãy đăng nhập vào hệ thống.')
            setIsRegister(false)
          } catch (error) {
            console.log(error)
            setError("Đăng ký thất bại. Email đã được sử dụng.")            
          }
        } else {
          setError('Hãy điền đủ các trường')
          return
        }
      } else {
        if (!email || !password) {
          setError('Hãy điền đủ các trường')
          return
        }
        dispatch(loginRequest(email, password))
      }
    }
  const onType = (field, value) => {
    setForm({ ...form, [field]: value })
  }
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
        contentContainerStyle={[
          styles.center,
          { height: '100%', width: '100%', flexDirection: 'column' },
        ]}>
        <View
          style={[
            { flex: 2, height: '100%', width: '100%' },
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
              marginVertical: APP_RATIO / 2,
              width: APP_SIZE.widthWindow - APP_RATIO * 2,
            },
          ]}>
          <Input
            onChangeText={e => onType('email', e)}
            label="Email"
            autoComplete={true}
            iconClass={FontAwesomeIcon}
            iconName="at"
            returnKeyType="next"
            numberOfLines={1}
            inputPadding={APP_RATIO * 2.25}
            autoFocus={false}
            secureTextEntry={false}
          />
        </View>
        {isRegister && (
          <View
            style={[
              styles.center,
              {
                marginVertical: APP_RATIO / 2,
                width: APP_SIZE.widthWindow - APP_RATIO * 2,
              },
            ]}>
            <Input
              onChangeText={e => onType('name', e)}
              label="Tên của bạn"
              iconClass={FontAwesomeIcon}
              iconName="user"
              returnKeyType="next"
              numberOfLines={1}
              inputPadding={APP_RATIO * 2.25}
              autoFocus={false}
              secureTextEntry={false}
            />
          </View>
        )}

        <View
          style={[
            styles.center,
            {
              marginVertical: APP_RATIO / 2,
              width: APP_SIZE.widthWindow - APP_RATIO * 2,
            },
          ]}>
          <Input
            onChangeText={e => onType('password', e)}
            label="Mật khẩu"
            iconClass={FontAwesomeIcon}
            iconName="lock"
            returnKeyType="next"
            numberOfLines={1}
            textContentType="password"
            inputPadding={APP_RATIO * 2.25}
            autoFocus={false}
            secureTextEntry={true}
            // height={APP_RATIO*3.5}
          />
        </View>
        {isRegister && (
          <View
            style={[
              styles.center,
              {
                marginVertical: APP_RATIO / 2,
                width: APP_SIZE.widthWindow - APP_RATIO * 2,
              },
            ]}>
            <Input
              onChangeText={e => onType('reTypePassword', e)}
              label="Nhập lại mật khẩu"
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
        )}

        <View
          style={[
            styles.container,
            styles.center,
            { justifyContent: 'flex-start' },
          ]}>
          {error && <AppTextBold style={{ color: 'red' }}>{error}</AppTextBold>}
          <TouchableOpacity
            style={[
              styles.card,
              styles.center,
              shadow(4),
              {
                height: APP_RATIO * 5,
                width: APP_SIZE.widthWindow - APP_RATIO * 2,
                margin: APP_RATIO,
                padding: APP_RATIO,
                // backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
            ]}
            onPress={onSubmit}>
            <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
              {!isRegister ? 'Đăng nhập' : 'Đăng ký'}
            </AppTextBold>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
            <AppTextBold style={{ color: 'white' }}>
              {!isRegister
                ? 'Bạn chưa có tài khoản? - Bấm vào đây để đăng ký'
                : 'Bạn đã có tài khoản? - Bấm vào đây để đăng nhập'}
            </AppTextBold>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  )
}
