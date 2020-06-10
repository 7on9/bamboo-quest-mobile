import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { BaseScreen, Answer, AppTextBold, AppHeader } from '../../components'
import { APP_COLORS, styles, APP_FONT_SIZES } from '../../configs/theme'
import { APP_SIZE, APP_RATIO } from '../../configs/appConstants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Images from '@assets/images'

const Player = (props) => {
  return (
    <View
      style={[
        styles.card,
        {
          width: APP_SIZE.widthWindow - APP_RATIO * 2,
          height: APP_SIZE.heightScreen * 0.075,
          marginTop: APP_RATIO,
          flexDirection: 'row',
          padding: APP_RATIO / 2,
        },
      ]}>
      <View style={[styles.center, { flex: 1 }]}>
        <AppTextBold numberOfLines={1}>1</AppTextBold>
      </View>
      <View style={{ flex: 4, justifyContent: 'center' }}>
        <AppTextBold numberOfLines={1}>Tên dkjandk</AppTextBold>
      </View>
      <View style={[styles.center, { flex: 5, flexDirection: 'row' }]}>
        <View style={[styles.center, { height: '100%' }]}>
          <Icon
            name="star"
            style={{ color: APP_COLORS.yellow }}
            size={APP_FONT_SIZES.large}
          />
        </View>
        <View
          style={[
            styles.center,
            { flex: 1, height: '100%', alignItems: 'flex-start' },
          ]}>
          <AppTextBold> 100 </AppTextBold>
        </View>
        <View style={[styles.center, { height: '100%' }]}>
          <Icon
            name="clock-o"
            style={{ color: APP_COLORS.blue }}
            size={APP_FONT_SIZES.large}
          />
        </View>
        <View
          style={[
            styles.center,
            { flex: 1, height: '100%', alignItems: 'flex-start' },
          ]}>
          <AppTextBold> 199.44 </AppTextBold>
        </View>
      </View>
    </View>
  )
}
export const RankScreen = (props) => {
  // const { players } = props
  const players = [1, 2, 3, 4, 5]
  return (
    <BaseScreen header={() => <AppHeader title="Trò chơi kết thúc" />}>
      <View
        style={[
          styles.center,
          {
            width: '100%',
            height: APP_SIZE.heightWindow * 0.4,
            justifyContent: 'space-evenly',
          },
        ]}>
        <AppTextBold style={{ fontSize: APP_FONT_SIZES.normal, color: '#413735'}}>Chúc mừng bạn đã hoàn thành phần chơi</AppTextBold>
        <AppTextBold style={{ fontSize: APP_FONT_SIZES.normal, color: '#413735'}}>Và đạt vị trí</AppTextBold>
        <View style={{ height: APP_SIZE.heightScreen * 0.1, width: APP_SIZE.heightScreen * 0.1 }}>
          <View style={[styles.center, { flex: 1, borderRadius: APP_SIZE.heightScreen * 0.05, borderWidth: APP_RATIO/2, borderColor: 'silver' }]}>
            <AppTextBold style={{ fontSize: APP_RATIO * 5, lineHeight: APP_SIZE.heightScreen * 0.09 , alignContent: 'center', color: 'gray' }}>
              5
            </AppTextBold>
          </View>
          {/* <Image
            source={Images.first}
            style={{
              height: APP_SIZE.heightScreen * 0.1,
              width: APP_SIZE.heightScreen * 0.1,
            }}
          /> */}
        </View>
        <View
          style={[
            styles.center,
            { flexDirection: 'row', height: APP_RATIO * 5 },
          ]}>
          <View style={[styles.center, { height: '100%', flex: 1 }]}>
            <Icon
              name="star"
              style={{ color: APP_COLORS.yellow }}
              size={APP_FONT_SIZES.large * 1.5}
            />
          </View>
          <View
            style={[
              styles.center,
              { flex: 1, height: '100%', alignItems: 'flex-start' },
            ]}>
            <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}> 100 </AppTextBold>
          </View>
          <View style={[styles.center, { height: '100%', flex: 1 }]}>
            <Icon
              name="clock-o"
              style={{ color: APP_COLORS.blue }}
              size={APP_FONT_SIZES.large * 1.5}
            />
          </View>
          <View
            style={[
              styles.center,
              { flex: 1, height: '100%', alignItems: 'flex-start' },
            ]}>
            <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}> 199.44 </AppTextBold>
          </View>
        </View>
      </View>
      <View style={[styles.center]}>
        <AppTextBold>Bảng xếp hạng</AppTextBold>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.center]}>
        {players &&
          players.length &&
          players.map((player) => <Player player />)}
      </ScrollView>
      <View
        style={{
          right: 0,
          bottom: 0,
          position: 'absolute',
          flexDirection: 'row',
          margin: APP_RATIO / 2,
        }}>
        <TouchableOpacity
          style={[
            styles.center,
            styles.card,
            {
              backgroundColor: 'green',
              height: APP_RATIO * 3.5,
              width: APP_RATIO * 5,
              borderRadius: APP_RATIO / 4,
              marginLeft: APP_RATIO / 2,
            },
          ]}>
          <AppTextBold style={{ color: '#fff' }}>Thoát</AppTextBold>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  )
}
