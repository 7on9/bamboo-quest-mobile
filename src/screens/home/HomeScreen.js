import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { QuestThumb } from '../../components/QuestThumb'
import { APP_SIZE } from '../../configs/appConstants'
import { styles, APP_COLORS } from '../../configs/theme'
import { shadow } from 'react-native-shadow-creator/shadow'
import { FlatList } from 'react-native-gesture-handler'

const _HomeScreen = () => {
  return (
    <View
      style={[styles.container, { backgroundColor: APP_COLORS.background }]}>
      <FlatList
        data={[1,2,3,4,5,6,7,8,9,10]}
        horizontal={true}
        contentContainerStyle={{ height: APP_SIZE.heightScreen/2 }}
        style={{width: APP_SIZE.widthScreen, height: APP_SIZE.widthScreen }}
        initialNumToRender={10}
        showsHorizontalScrollIndicator={false}
        renderItem={(item) => (
          <QuestThumb
            key={item}
            style={{
              width: APP_SIZE.widthScreen / 2,
              height: APP_SIZE.heightWindow / 3,
              margin: 10,
              ...shadow(12),
            }}
            quest={{
              image: {
                uri:
                  'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg',
              },
            }}
          />
        )}
      />
    </View>
  )
}

export const HomeScreen = _HomeScreen
