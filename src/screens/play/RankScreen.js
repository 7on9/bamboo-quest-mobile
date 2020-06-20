import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { BaseScreen, Answer, AppTextBold, AppHeader } from '../../components'
import { APP_COLORS, styles, APP_FONT_SIZES } from '../../configs/theme'
import { APP_SIZE, APP_RATIO } from '../../configs/appConstants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Images from '@assets/images'
import { useNavigation } from '@react-navigation/native'

const Player = ({ idx, player }) => {
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
        <AppTextBold numberOfLines={1}>{idx + 1}</AppTextBold>
      </View>
      <View style={{ flex: 4, justifyContent: 'center' }}>
        <AppTextBold numberOfLines={1}>{player.username}</AppTextBold>
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
          <AppTextBold> {player.score} </AppTextBold>
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
          <AppTextBold> {player.time.toFixed(2)} </AppTextBold>
        </View>
      </View>
    </View>
  )
}

const ranks = [Images.first, Images.second, Images.third]

export const RankScreen = ({ socketState, resetStatus }) => {
  const navigation = useNavigation()
  let { players } = socketState
  players.sort((pA, pB) => pB.score - pA.score || pA.time - pB.time)
  const thisPlayer = players.findIndex(
    (p) => p.username == socketState.game.username
  )
  return (
    <BaseScreen header={() => <AppHeader title="Trò chơi kết thúc" />}>
      <View
        style={[
          styles.center,
          {
            width: '100%',
            height: APP_SIZE.heightWindow * 0.35,
            justifyContent: 'space-evenly',
          },
        ]}>
        <AppTextBold
          style={{ fontSize: APP_FONT_SIZES.large, color: '#413735' }}>
          Bạn đã hoàn thành phần chơi
        </AppTextBold>
        <AppTextBold
          style={{ fontSize: APP_FONT_SIZES.large, color: '#413735' }}>
          Và đạt vị trí
        </AppTextBold>
        <View
          style={{
            height: APP_SIZE.heightScreen * 0.1,
            width: APP_SIZE.heightScreen * 0.1,
          }}>
          {thisPlayer < ranks.length ? (
            <Image
              source={ranks[thisPlayer]}
              style={{
                height: APP_SIZE.heightScreen * 0.1,
                width: APP_SIZE.heightScreen * 0.1,
              }}
            />
          ) : (
            <View
              style={[
                styles.center,
                {
                  flex: 1,
                  borderRadius: APP_SIZE.heightScreen * 0.05,
                  borderWidth: APP_RATIO / 2,
                  borderColor: 'silver',
                },
              ]}>
              <AppTextBold
                style={{
                  fontSize: APP_RATIO * 5,
                  lineHeight: APP_SIZE.heightScreen * 0.09,
                  alignContent: 'center',
                  color: 'gray',
                }}>
                {thisPlayer + 1}
              </AppTextBold>
            </View>
          )}
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
            <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
              {' '}
              {players[thisPlayer].score}{' '}
            </AppTextBold>
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
            <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
              {' '}
              {players[thisPlayer].time.toFixed(2)}{' '}
            </AppTextBold>
          </View>
        </View>
      </View>
      <View style={[styles.center]}>
        <AppTextBold>Bảng xếp hạng</AppTextBold>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.center]}>
        {players &&
          players.length &&
          players.map((player, idx) => <Player idx={idx} player={player} />)}
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
          onPress={() => {
            // navigation.navigate('PlayScreen')
            resetStatus()
          }}
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
