import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native'
import { QuestThumb } from '../../components/QuestThumb'
import { APP_SIZE, APP_RATIO, headerHeight } from '../../configs/appConstants'
import {
  styles,
  APP_COLORS,
  APP_FONT_SIZES,
  appBorderRadius,
} from '../../configs/theme'
import { shadow } from 'react-native-shadow-creator/shadow'
import { FlatList } from 'react-native-gesture-handler'
import { dataProvider } from '../../services/dataProvider'
import {
  AppTextBold,
  Header,
  SearchBar,
  BaseScreen,
  CategoryThumb,
} from '../../components'
import Images from '@assets/images'
import { useSelector } from 'react-redux'
import DeviceInfo from 'react-native-device-info'

const HomeScreenHeader = () => (
  <Header
    style={{
      height: headerHeight + APP_SIZE.heightWindow * 0.15 * 0.35,
      paddingBottom: APP_RATIO / 2,
      // opacity: 0.5,
    }}
    backgroundColor={APP_COLORS.main}>
    <View style={[styles.center, styles.container]}>
      <Text
        style={{
          fontSize: APP_FONT_SIZES.header,
          fontFamily: 'OpenSans-Bold',
          color: '#fff',
          marginTop: DeviceInfo.hasNotch() ? APP_SIZE.statusBarHeight : 0,
        }}>
        Bamboo Quest
      </Text>
      <SearchBar
        style={{
          height: APP_SIZE.heightWindow * 0.15 * 0.35,
          // backgroundColor: APP_COLORS.main,
          marginHorizontal: APP_RATIO,
          marginTop: APP_RATIO,
          marginBottom: APP_RATIO * 0.5,
          borderRadius: appBorderRadius,
        }}
      />
    </View>
  </Header>
)

const _HomeScreen = ({ navigation }) => {
  const [publicQuests, setPublicQuests] = useState([])
  const [categories, setCategories] = useState([])
  const [myQuest, setMyQuest] = useState([])

  const getMyQuest = async () => {
    setMyQuest([])
    let res = await dataProvider('/quest/my-quests')
    setMyQuest(res && res.data ? res.data : [])
  }

  const getQuest = async () => {
    setPublicQuests([])
    let res = await dataProvider('/quest/?limit=5&skip=0')
    setPublicQuests(res && res.data ? res.data : [])
  }

  const getCategory = async () => {
    setCategories([])
    let res = await dataProvider('/category/?limit=5&skip=0')
    setCategories(res && res.data ? res.data : [])
  }

  const { user, isAuthenticated } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (!publicQuests.length) {
      getQuest()
    }
    if (!categories.length) {
      getCategory()
    }
    if (isAuthenticated && !myQuest.length) {
      getMyQuest()
    }
  }, [isAuthenticated])

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true)
    await Promise.all([getQuest(), getMyQuest(), getCategory()])
    setRefreshing(false)
  }, [refreshing])

  return (
    <BaseScreen header={HomeScreenHeader}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={style.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* Banner */}
          {/* <View style={[styles.card, { height: APP_SIZE.heightWindow * 0.075, margin: APP_RATIO, flexDirection: 'row' }]}>
              </View> */}
          {/* ListQuests */}
          {isAuthenticated && (
            <ListQuestViewer
              listItems={myQuest}
              backgroundColor="#645DD7"
              icon={Images.library}
              title="Thử thách của bạn"
              navigation={navigation}
            />
          )}
          <ListQuestViewer
            listItems={publicQuests}
            backgroundColor="#1ea896"
            icon={Images.trending}
            title="Được yêu thích nhất"
            navigation={navigation}
          />
          <ListQuestViewer
            listItems={publicQuests}
            backgroundColor="#f85457"
            icon={Images.newStar}
            title="Thử thách mới"
            navigation={navigation}
          />
          <ListCategoryViewer
            listItems={categories}
            backgroundColor="#4C5454"
            icon={Images.newStar}
            title="Chủ đề"
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </BaseScreen>
  )
}

export const HomeScreen = _HomeScreen

const ListQuestViewer = ({
  listItems,
  backgroundColor,
  title,
  icon,
  navigation,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        height: APP_RATIO * 27.5,
        backgroundColor,
        marginBottom: APP_RATIO,
        ...shadow(12, backgroundColor),
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            marginLeft: APP_RATIO,
            paddingTop: APP_RATIO * 0.5,
            flexDirection: 'row',
          }}>
          <Image
            source={icon}
            style={{
              width: APP_FONT_SIZES.header,
              height: APP_FONT_SIZES.header,
            }}
          />
          <AppTextBold
            style={{
              fontSize: APP_FONT_SIZES.normal,
              color: '#fff',
              marginLeft: APP_RATIO / 4,
            }}>
            {title}
          </AppTextBold>
        </View>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Quest', { abc: 123 })
          }}
          style={{
            marginRight: APP_RATIO,
            paddingTop: APP_RATIO * 0.5,
          }}>
          <AppTextBold
            style={{ fontSize: APP_FONT_SIZES.normal, color: '#fff' }}>
            Xem tất cả
          </AppTextBold>
        </TouchableOpacity>
      </View>
      {listItems.length ? (
        <FlatList
          data={listItems}
          horizontal={true}
          contentContainerStyle={{
            alignSelf: 'center',
            paddingRight: APP_RATIO,
            ...shadow(10),
          }}
          style={{
            width: APP_SIZE.widthWindow,
            height: APP_SIZE.heightWindow / 3 + APP_RATIO * 0.5,
            paddingLeft: APP_RATIO,
          }}
          initialNumToRender={10}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${Date.now()}${Math.random()}${item.id}`}
          renderItem={(item) => {
            let quest = item.item
            return (
              <QuestThumb
                onPress={() => {
                  navigation.navigate('Quest', { quest })
                }}
                key={quest._id}
                style={{
                  // width: APP_SIZE.widthWindow / 2,
                  // height: APP_SIZE.heightWindow / 3,
                  width: APP_RATIO * 16,
                  height: APP_RATIO * 22.5,
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
  )
}

const ListCategoryViewer = ({ listItems, backgroundColor, title, icon }) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          height: APP_RATIO * 27.5,
          backgroundColor,
          marginBottom: APP_RATIO,
        },
        shadow(12, backgroundColor),
      ]}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            marginLeft: APP_RATIO,
            paddingTop: APP_RATIO * 0.5,
            flexDirection: 'row',
          }}>
          <Image
            source={icon}
            style={{
              width: APP_FONT_SIZES.header,
              height: APP_FONT_SIZES.header,
            }}
          />
          <AppTextBold
            style={{
              fontSize: APP_FONT_SIZES.normal,
              color: '#fff',
              marginLeft: APP_RATIO / 4,
            }}>
            {title}
          </AppTextBold>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('123'), navigation.navigate('Quest', { abc: 123 })
          }}
          style={{
            marginRight: APP_RATIO,
            paddingTop: APP_RATIO * 0.5,
          }}>
          <AppTextBold
            style={{ fontSize: APP_FONT_SIZES.normal, color: '#fff' }}>
            Xem tất cả
          </AppTextBold>
        </TouchableOpacity>
      </View>
      {listItems.length ? (
        <FlatList
          data={listItems}
          horizontal={true}
          contentContainerStyle={{
            alignSelf: 'center',
            paddingRight: APP_RATIO,
            ...shadow(10),
          }}
          style={{
            width: APP_SIZE.widthWindow,
            height: APP_SIZE.heightWindow / 3 + APP_RATIO * 0.5,
            paddingLeft: APP_RATIO,
          }}
          initialNumToRender={10}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${Date.now()}${Math.random()}${item.id}`}
          renderItem={(item) => {
            let category = item.item
            return (
              <CategoryThumb
                key={category._id}
                style={{
                  // width: APP_SIZE.widthWindow / 2,
                  // height: APP_SIZE.heightWindow / 3,
                  width: APP_RATIO * 20,
                  height: APP_RATIO * 22.5,
                  marginRight: APP_RATIO,
                }}
                category={{
                  ...category,
                  image: {
                    uri: category.img_path,
                  },
                }}
              />
            )
          }}
        />
      ) : null}
    </View>
  )
}

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
    // backgroundColor: 'red',
    backgroundColor: APP_COLORS.background,
    paddingTop: APP_RATIO,
    // paddingVertical: APP_RATIO
  },
})
