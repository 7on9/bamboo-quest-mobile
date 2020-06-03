import React, { useState, useEffect, useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { APP_SIZE, APP_RATIO, headerHeight } from '../../configs/appConstants'
import { styles, APP_COLORS, APP_FONT_SIZES } from '../../configs/theme'
import { shadow } from 'react-native-shadow-creator/shadow'
import { dataProvider } from '../../services/dataProvider'
import { AppTextBold, Header, BaseScreen, AppText } from '../../components'
import _ from 'lodash'
import Images from '@assets/images'
import { useSelector } from 'react-redux'
import DeviceInfo from 'react-native-device-info'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { formatNumber } from '../../utils/text'

const QuestScreenHeader = ({ title }) => {
  const navigation = useNavigation()
  return (
    <Header
      style={{
        height: headerHeight,
        paddingBottom: APP_RATIO / 2,
        // opacity: 0.5,
      }}
      backgroundColor={APP_COLORS.main}>
      <View
        style={([styles.center, styles.container], { flexDirection: 'row' })}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'flex-end',
            height: '100%',
            alignItems: 'center',
            flex: 1,
            // backgroundColor: 'blue'
          }}>
          <Icon name="chevron-left" color="#fff" size={24} />
        </TouchableOpacity>
        <View
          style={{
            flex: 9,
            marginTop: DeviceInfo.hasNotch() ? APP_SIZE.statusBarHeight : 0,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: APP_SIZE.widthWindow / 9,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: APP_FONT_SIZES.header,
              fontFamily: 'OpenSans-Bold',
              color: '#fff',
              width: APP_SIZE.widthWindow / 1.5,
              textAlign: 'center',
            }}>
            {title || 'Bamboo Quest'}
          </Text>
        </View>
      </View>
    </Header>
  )
}

const _QuestScreen = (props) => {
  const [quest, setQuest] = useState(props.route.params.quest)
  const [liked, setLiked] = useState(null)
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const like = async () => {
    try {
      let res = await dataProvider('/quest/like', {
        method: 'POST',
        data: { _id: quest._id },
      })
      setQuest(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const isLiked = async () => {
    if (quest.like.length) {
      let q = await quest.like.find((id) => id == user._id)
      setLiked(q)
      return
    }
    setLiked(false)
  }

  useEffect(() => {
    if (quest && quest.like) {
      isLiked()
    }
  }, [quest])

  return (
    quest && (
      <BaseScreen header={() => QuestScreenHeader({ title: quest.title })}>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[styles.center]}>
            <View
              style={[
                styles.center,
                shadow(4),
                { width: '100%', backgroundColor: '#fff' },
              ]}>
              <Image
                defaultSource={Images.picture}
                style={{
                  height: APP_SIZE.heightWindow * 0.45,
                  width: APP_SIZE.widthWindow,
                }}
                source={{ uri: quest.img_path }}
              />
              <View
                style={{
                  height: APP_SIZE.heightScreen * 0.05,
                  flexDirection: 'row',
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View
                    style={[
                      {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <Icon
                      color="violet"
                      name="play"
                      size={APP_FONT_SIZES.large}
                    />
                  </View>
                  <View
                    style={[
                      styles.center,
                      { flex: 1, alignItems: 'flex-start' },
                    ]}>
                    <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
                      {formatNumber(Math.floor(Math.random() * 100))}
                    </AppTextBold>
                  </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View
                    style={[
                      {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <Icon
                      color="blue"
                      name="question-circle"
                      size={APP_FONT_SIZES.large}
                    />
                  </View>
                  <View
                    style={[
                      styles.center,
                      { flex: 1, alignItems: 'flex-start' },
                    ]}>
                    <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
                      {formatNumber(_.get(quest, 'questions.length'))}
                    </AppTextBold>
                  </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View
                    style={[
                      {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <Icon
                      color="orange"
                      name="star"
                      size={APP_FONT_SIZES.large}
                    />
                  </View>
                  <View
                    style={[
                      styles.center,
                      { flex: 1, alignItems: 'flex-start' },
                    ]}>
                    <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
                      {formatNumber(_.get(quest, 'like.length'))}
                    </AppTextBold>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: APP_SIZE.widthWindow - APP_RATIO * 2,
                margin: APP_RATIO,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={[
                    styles.card,
                    styles.center,
                    {
                      height: APP_RATIO * 5,
                      flexDirection: 'row',
                      width: APP_SIZE.widthWindow * 0.7,
                      padding: APP_RATIO / 2,
                      borderRadius: APP_RATIO / 4,
                    },
                  ]}>
                  <View style={[styles.center, { flex: 1 }]}>
                    <Icon
                      color="purple"
                      name="user"
                      size={APP_FONT_SIZES.large}
                    />
                  </View>
                  <AppTextBold
                    style={{
                      flex: 4,
                      paddingLeft: APP_RATIO,
                      fontSize: APP_FONT_SIZES.normal,
                    }}
                    numberOfLines={1}>
                    {quest.author || 'Tác giả'}
                  </AppTextBold>
                </View>
                {isAuthenticated && (
                  <TouchableOpacity
                    onPress={() => like()}
                    style={[
                      styles.card,
                      styles.center,
                      {
                        borderRadius: APP_RATIO / 4,
                        flexDirection: 'row',
                        height: APP_RATIO * 5,
                        marginHorizontal: APP_RATIO,
                        padding: APP_RATIO / 2,
                        width: APP_SIZE.widthWindow * 0.2,
                      },
                    ]}>
                    <View style={[styles.center, { flex: 1 }]}>
                      <Icon
                        name={liked ? 'star' : 'star-o'}
                        size={APP_FONT_SIZES.large}
                        color="orange"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={{ width: APP_SIZE.widthWindow - APP_RATIO * 2 }}>
              <AppTextBold style={{ fontSize: APP_FONT_SIZES.normal }}>
                Mô tả thử thách
              </AppTextBold>
              <AppText>{quest.description}</AppText>
            </View>
            <View
              style={{
                width: APP_SIZE.widthWindow - APP_RATIO * 2,
                paddingVertical: APP_RATIO,
              }}>
              <AppTextBold style={{ fontSize: APP_FONT_SIZES.normal }}>
                Câu hỏi
              </AppTextBold>
              {quest.questions.map((question) => {
                return (
                  <View
                    key={Math.random()}
                    style={{
                      flexDirection: 'row',
                      height: APP_RATIO * 5,
                      marginTop: APP_RATIO,
                    }}>
                    <View style={{ flex: 2.5 }}>
                      <Image
                        source={
                          question.img_path
                            ? { uri: question.img_path }
                            : Images.picture
                        }
                        defaultSource={Images.picture}
                        style={{ height: APP_RATIO * 5, width: 'auto' }}
                      />
                    </View>
                    <View style={{ flex: 7.5, paddingLeft: APP_RATIO }}>
                      <AppTextBold numberOfLines={3}>
                        {question.quiz}
                      </AppTextBold>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
          <View
            style={{
              right: 0,
              bottom: 0,
              position: 'absolute',
              flexDirection: 'row',
              margin: APP_RATIO / 2,
            }}>
            {user._id == quest.id_author && (
              <TouchableOpacity
                style={[
                  styles.center,
                  styles.card,
                  {
                    backgroundColor: 'gray',
                    height: APP_RATIO * 3.5,
                    width: APP_RATIO * 5,
                    borderRadius: APP_RATIO / 4,
                  },
                ]}>
                <AppTextBold style={{ color: '#fff' }}>Sửa</AppTextBold>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.center,
                styles.card,
                {
                  backgroundColor: 'green',
                  height: APP_RATIO * 3.5,
                  width: APP_RATIO * 7,
                  borderRadius: APP_RATIO / 4,
                  marginLeft: APP_RATIO / 2,
                },
              ]}>
              <AppTextBold style={{ color: '#fff' }}>Tạo phòng</AppTextBold>
            </TouchableOpacity>
          </View>
        </View>
      </BaseScreen>
    )
  )
}

export const QuestScreen = _QuestScreen

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
    // backgroundColor: 'red',
    backgroundColor: APP_COLORS.background,
    // paddingVertical: APP_RATIO
  },
})
