import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { BaseScreen, AppTextBold, AppText } from '../../components'
import Images from '@assets/images'
import { styles, APP_COLORS, APP_FONT_SIZES } from '../../configs/theme'
import { APP_SIZE, APP_RATIO } from '../../configs/appConstants'
import { shadow } from 'react-native-shadow-creator/shadow'
import Icon from 'react-native-vector-icons/FontAwesome'

const _ProfileScreen = () => {
  return (
    <View style={[styles.container]}>
      <View
        style={[
          {
            flex: 2.5,
            backgroundColor: APP_COLORS.main,
            opacity: 999,
            justifyContent: 'flex-end',
            zIndex: 999,
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
              paddingBottom: APP_RATIO,
            },
            shadow(4),
          ]}>
          <Image
            defaultSource={Images.picture}
            source={Images.picture}
            style={{
              borderColor: '#fff',
              borderRadius: APP_SIZE.widthWindow * 0.1125,
              borderWidth: APP_RATIO * 0.3,
              height: APP_SIZE.widthWindow * 0.225,
              resizeMode: 'cover',
              width: APP_SIZE.widthWindow * 0.225,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: APP_RATIO,
          }}>
          <AppTextBold
            style={{ color: '#fff', fontSize: APP_FONT_SIZES.header }}>
            Tên người dùng{'  '}
          </AppTextBold>
          <Icon name="pencil" size={APP_FONT_SIZES.normal} color="#fff" />
        </View>
      </View>
      <View
        style={[
          { backgroundColor: APP_COLORS.background, flex: 7.5 },
          styles.center,
        ]}>
        <ScrollView style={{ flex: 1, paddingVertical: APP_RATIO }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <TouchableOpacity
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
                shadow(4),
                { overflow: 'visible' },
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
                    size={APP_RATIO * 2}
                    name="user"
                    color="rgba(01,01,01, 0.5)"
                  />
                </View>
              </View>

              <View style={[{ flex: 6, paddingVertical: APP_RATIO }]}>
                <View style={{ flex: 2 }}>
                  <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
                    Tên người dùng
                  </AppTextBold>
                </View>
                <View style={{ flex: 1 }}>
                  <AppText style={{ fontSize: APP_FONT_SIZES.small }}>
                    Tiêu đề
                  </AppText>
                </View>
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
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export const ProfileScreen = _ProfileScreen
