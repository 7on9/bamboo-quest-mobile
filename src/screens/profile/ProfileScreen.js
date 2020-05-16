import React, { useMemo } from 'react'
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { BaseScreen, AppTextBold, AppText, AppButton } from '../../components'
import Images from '@assets/images'
import { styles, APP_COLORS, APP_FONT_SIZES } from '../../configs/theme'
import { APP_SIZE, APP_RATIO } from '../../configs/appConstants'
import { shadow } from 'react-native-shadow-creator/shadow'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../redux/actions/authAction'

const _ProfileScreen = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  console.log(user)
  const { avatar_path, email, name } = useMemo(() => user, [user])
  return (
    <View style={[styles.container]}>
      <View
        style={[
          {
            // flex: 6.5,
            backgroundColor: APP_COLORS.main,
            // opacity: 999,
            // justifyContent: 'center',
            // alignItems: 'center',
            zIndex: 999,
            height: APP_RATIO * 29,
            // marginBottom: 12,
          },
          styles.center,
          shadow(8, APP_COLORS.main),
        ]}>
        <View
          style={[
            {
              flex: 4,
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            shadow(6),
          ]}>
          <Image
            defaultSource={Images.picture}
            source={{ uri: avatar_path }}
            style={{
              borderColor: '#fff',
              borderRadius: APP_RATIO * 30,
              borderWidth: APP_RATIO * 0.3,
              height: APP_RATIO * 15,
              resizeMode: 'cover',
              width: APP_RATIO * 15,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: APP_RATIO,
            ...shadow(6)
          }}>
          <AppTextBold
            style={{ color: '#fff', fontSize: APP_RATIO * 2 }}>
            Tên ingame
          </AppTextBold>
          <Icon name="pencil" size={APP_RATIO * 1.5} color="#fff" />
        </View>
      </View>
      <View
        style={[
          { backgroundColor: APP_COLORS.background, flex: 7.5 },
          styles.center,
        ]}>
        <ScrollView style={{ flex: 1, paddingVertical: APP_RATIO }}>
          {/* <AppButton style={{ backgroundColor: 'red', ...styles.center  }}>
            <AppTextBold style={{ color: '#fff', fontSize: APP_FONT_SIZES.normal }}>
              test
            </AppTextBold>
          </AppButton> */}
          <ItemInfo
            key={Math.random()}
            icon="user"
            title="Họ và tên"
            value={name || "Tên người dùng"}
          />
          <ItemInfo
            key={Math.random()}
            icon="at"
            title="Email"
            value={ email || "your_email@sample.com"}
          />
          <ItemInfo
            key={Math.random()}
            icon="birthday-cake"
            title="Năm sinh"
            value="20/07/1998"
          />
          <ItemInfo key={Math.random()} icon="sign-out" value="Đăng xuất" onPress={() => dispatch(logOut())} />
        </ScrollView>
      </View>
    </View>
  )
}

export const ProfileScreen = _ProfileScreen

const ItemInfo = ({ style, icon, title, value, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: '#fff',
          marginHorizontal: APP_RATIO,
          height: APP_SIZE.heightWindow * 0.1,
          width: APP_SIZE.widthWindow - APP_RATIO * 2,
          flexDirection: 'row',
          borderRadius: APP_RATIO * 0.4,
          marginBottom: APP_RATIO,
        },
        shadow(2),
        { overflow: 'visible' },
        style,
      ]}>
      <View style={[{ flex: 2 }, styles.center]}>
        <View
          style={[
            {
              backgroundColor: 'rgba(01, 01, 01, 0.15)',
              width: APP_RATIO * 3,
              height: APP_RATIO * 3,
              borderRadius: APP_RATIO * 1.5,
            },
            styles.center,
          ]}>
          <Icon
            size={APP_RATIO * 1.75}
            name={icon}
            color="rgba(01,01,01, 0.5)"
          />
        </View>
      </View>

      <View style={[{ flex: 6, paddingVertical: APP_RATIO }]}>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
            {value}
          </AppTextBold>
        </View>
        {title && (
          <View style={{ flex: 1 }}>
            <AppText style={{ fontSize: APP_FONT_SIZES.small }}>
              {title}
            </AppText>
          </View>
        )}
      </View>
      {/* <View style={[{ flex: 2 }, styles.center]}>
    <View
      style={[
        {
          backgroundColor: 'rgba(01, 01, 01, 0.15)',
          width: APP_RATIO * 3,
          height: APP_RATIO * 3,
          borderRadius: APP_RATIO * 1.5,
        },
        styles.center,
      ]}>
      <Icon size={APP_RATIO * 2} name="pencil" color="gray" />
    </View>
  </View> */}
    </TouchableOpacity>
  )
}
