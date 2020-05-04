import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { QuestThumb } from '../../components/QuestThumb'
import { APP_SIZE, APP_RATIO } from '../../configs/appConstants'
import { styles, APP_COLORS } from '../../configs/theme'
import { shadow } from 'react-native-shadow-creator/shadow'
import { FlatList } from 'react-native-gesture-handler'
import { dataProvider } from '../../../services/dataProvider'
import { AppTextBold } from '../../components'
import Images from '@assets/images'

const _HomeScreen = () => {
  const [publicQuests, setPublicQuests] = useState([])
  const getQuest = async () => {
    let res = await dataProvider('/quest/?limit=10&skip=0')
    console.log(res.data)
    setPublicQuests(res.data)
  }
  useEffect(() => {
    if (publicQuests.length) return
    getQuest()
  }, [])
  return (
    <ScrollView style={[{ backgroundColor: APP_COLORS.background }]}>
      {/* <View></View> */}

      <View
        style={{
          display: 'flex',
          height: APP_SIZE.heightWindow / 3 + APP_RATIO * 4,
          backgroundColor: '#645DD7',
          marginTop: APP_RATIO,
          ...shadow(12)
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              marginLeft: APP_RATIO,
              paddingTop: APP_RATIO * 0.5,
              flexDirection: 'row'
            }}>
            <Image
              source={Images.trending}
              style={{ width: APP_RATIO*1.25, height: APP_RATIO*1.25 }}
            />
            <AppTextBold
              style={{
                fontSize: APP_RATIO,
                color: '#fff',
                marginLeft: APP_RATIO/4
              }}>
              Được yêu thích nhất
            </AppTextBold>
          </View>
          <TouchableOpacity
            style={{
              marginRight: APP_RATIO,
              paddingTop: APP_RATIO * 0.5,
            }}>
            <AppTextBold style={{ fontSize: APP_RATIO, color: '#fff' }}>
              Xem tất cả
            </AppTextBold>
          </TouchableOpacity>
        </View>
        {publicQuests.length ? (
          <FlatList
            data={publicQuests}
            horizontal={true}
            contentContainerStyle={{
              alignSelf: 'center',
              paddingRight: APP_RATIO,
              ...shadow(10),
            }}
            style={{
              width: APP_SIZE.widthScreen,
              height: APP_SIZE.heightWindow / 3 + APP_RATIO * 0.5,
              paddingLeft: APP_RATIO,
            }}
            initialNumToRender={10}
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => {
              let quest = item.item
              return (
                <QuestThumb
                  key={quest._id}
                  style={{
                    width: APP_SIZE.widthScreen / 2,
                    height: APP_SIZE.heightWindow / 3,
                    marginRight: APP_RATIO,
                  }}
                  quest={{
                    ...quest,
                    image: {
                      uri: quest.img_path,
                    },
                  }}
                />
              )
            }}
          />
        ) : null}
      </View>
    
      <View
        style={{
          display: 'flex',
          height: APP_SIZE.heightWindow / 3 + APP_RATIO * 4,
          backgroundColor: '#f85457',
          marginTop: APP_RATIO,
          ...shadow(12)
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              marginLeft: APP_RATIO,
              paddingTop: APP_RATIO * 0.5,
              flexDirection: 'row'
            }}>
            <Image
              source={Images.newStar}
              style={{ width: APP_RATIO*1.25, height: APP_RATIO*1.25 }}
            />
            <AppTextBold
              style={{
                fontSize: APP_RATIO,
                color: '#fff',
                marginLeft: APP_RATIO/4
              }}>
              Thử thách mới
            </AppTextBold>
          </View>
          <TouchableOpacity
            style={{
              marginRight: APP_RATIO,
              paddingTop: APP_RATIO * 0.5,
            }}>
            <AppTextBold style={{ fontSize: APP_RATIO, color: '#fff' }}>
              Xem tất cả
            </AppTextBold>
          </TouchableOpacity>
        </View>
        {publicQuests.length ? (
          <FlatList
            data={publicQuests}
            horizontal={true}
            contentContainerStyle={{
              alignSelf: 'center',
              paddingRight: APP_RATIO,
              ...shadow(10),
            }}
            style={{
              width: APP_SIZE.widthScreen,
              height: APP_SIZE.heightWindow / 3 + APP_RATIO * 0.5,
              paddingLeft: APP_RATIO,
            }}
            initialNumToRender={10}
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => {
              let quest = item.item
              return (
                <QuestThumb
                  key={quest._id}
                  style={{
                    width: APP_SIZE.widthScreen / 2,
                    height: APP_SIZE.heightWindow / 3,
                    marginRight: APP_RATIO,
                  }}
                  quest={{
                    ...quest,
                    image: {
                      uri: quest.img_path,
                    },
                  }}
                />
              )
            }}
          />
        ) : null}
      </View>
    
    </ScrollView>
  )
}

export const HomeScreen = _HomeScreen
