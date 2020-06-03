import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  TouchableHighlight,
} from 'react-native'
import { styles, APP_FONT_SIZES, APP_COLORS } from '../../configs/theme'
import {
  AppButton,
  AppTextBold,
  BaseScreen,
  Header,
  AppText,
  AppModal,
} from '../../components'
import { APP_SIZE, APP_RATIO, headerHeight } from '../../configs/appConstants'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import Icon from 'react-native-vector-icons/FontAwesome'
import { shadow } from 'react-native-shadow-creator/shadow'
import Images from '@assets/images'
import { formatNumber } from '../../utils/text'
import _ from 'lodash'
import ImagePicker from 'react-native-image-picker'
import CreateQuestionDialog from '../../components/CreateQuestionDialog'

const CreateQuestScreenHeader = () => {
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
          {/* <Icon name="chevron-left" color="#fff" size={24} /> */}
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
            style={{
              fontSize: APP_FONT_SIZES.header,
              fontFamily: 'OpenSans-Bold',
              color: '#fff',
            }}>
            {'Tạo thử thách'}
          </Text>
        </View>
      </View>
    </Header>
  )
}

const WarningNotLogin = () => {
  const navigation = useNavigation()
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
      <AppButton
        onPress={() => navigation.navigate('Profile')}
        style={[
          styles.center,
          {
            height: APP_SIZE.heightWindow * 0.1,
            backgroundColor: 'red',
            padding: APP_RATIO,
          },
        ]}>
        <AppTextBold style={{ color: '#fff', fontSize: APP_FONT_SIZES.header }}>
          Bấm vào đây để đăng nhập
        </AppTextBold>
      </AppButton>
    </LinearGradient>
  )
}

const CreateQuest = () => {
  const [quest, setQuest] = useState({
    title: '',
    questions: [],
    description: '',
  })
  const [image, setImage] = useState(null)
  const [question, setQuestion] = useState(null)

  const onChangeText = (name, value) => {
    setQuest((_quest) => ({ ...quest, [name]: value }))
  }

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    try {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri) {
          setImage(response)
          // this.setState({ photo: response });
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [modalVisible, setModalVisible] = useState(false)

  const openModal = (question) => {
    setModalVisible(true)
    if (question) {
      setQuestion(question)
    }
  }

  const onAddQuestion = (question) => {
    let { questions } = quest
    questions.push(question)
    setQuest(_quest => ({ ..._quest, questions }))
    // console.log(question)
  }

  return (
    <View style={{ flex: 1 }}>
      <CreateQuestionDialog
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        onAddQuestion={onAddQuestion}
      />
      {/* <AppModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => { Alert.alert('Modal has been closed.')}}
        >
        <View
          style={[
            styles.center,
            styles.card,
            {
              height: 'auto',
              width: APP_SIZE.widthWindow - APP_RATIO * 2,
              padding: APP_RATIO,
              backgroundColor: '#fff',
            },
          ]}>
          <View style={styles.modalView}>
            <AppTextBold style={{ fontSize: APP_FONT_SIZES.header}}>Tạo câu hỏi</AppTextBold>
          </View>
          <View style={{ width: '100%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.center, {
                ...styles.openButton,
                backgroundColor: '#f0f0f0f0',
                height: APP_RATIO * 5,
                borderRadius: APP_RATIO/4,
                flex: 1,
                marginRight: APP_RATIO/2
                // margin: APP_RATIO
              }]}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}>
              <AppTextBold style={{ color: 'gray' }}>Hủy</AppTextBold>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.center, {
                ...styles.openButton,
                backgroundColor: APP_COLORS.main,
                height: APP_RATIO * 5,
                borderRadius: APP_RATIO/4,
                flex: 1,
                marginLeft: APP_RATIO/2
                // margin: APP_RATIO
              }]}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}>
              <AppTextBold style={{ color: '#fff' }}>Tạo câu hỏi</AppTextBold>
            </TouchableOpacity>
          </View>
        </View>
     
      </AppModal> */}

      <ScrollView
        style={style.scrollView}
        contentContainerStyle={[styles.center]}>
        <TouchableOpacity
          onPress={handleChoosePhoto}
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
            source={!image || !image.uri ? Images.picture : { uri: image.uri }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: APP_SIZE.widthWindow - APP_RATIO * 2,
            marginTop: APP_RATIO,
          }}>
          <AppTextBold style={{ fontSize: APP_FONT_SIZES.normal }}>
            Tên thử thách
            <AppText style={{ color: 'gray' }}>
              {' '}
              {quest.title.length}/50
            </AppText>
          </AppTextBold>
          <TextInput
            onChangeText={(value) => onChangeText('title', value)}
            maxLength={50}
            style={[
              shadow(2),
              {
                width: APP_SIZE.widthWindow - APP_RATIO * 2,
                height: 'auto',
                backgroundColor: '#fff',
                padding: APP_RATIO,
                marginTop: APP_RATIO / 2,
              },
            ]}
          />
        </View>
        <View
          style={{
            width: APP_SIZE.widthWindow - APP_RATIO * 2,
            marginTop: APP_RATIO,
          }}>
          <AppTextBold style={{ fontSize: APP_FONT_SIZES.normal }}>
            Mô tả
            <AppText style={{ color: 'gray' }}>
              {' '}
              {quest.description.length}/150
            </AppText>
          </AppTextBold>
          <TextInput
            onChangeText={(value) => onChangeText('description', value)}
            maxLength={150}
            multiline={true}
            numberOfLines={3}
            scrollEnabled={true}
            style={[
              shadow(2),
              {
                width: APP_SIZE.widthWindow - APP_RATIO * 2,
                height: APP_RATIO * 6.5,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#fff',
                padding: APP_RATIO,
                marginTop: APP_RATIO / 2,
              },
            ]}
          />
        </View>
        <View
          style={{
            width: APP_SIZE.widthWindow - APP_RATIO * 2,
            paddingVertical: APP_RATIO,
          }}>
          <AppTextBold style={{ fontSize: APP_FONT_SIZES.normal }}>
            Câu hỏi
          </AppTextBold>
          <TouchableOpacity
            onPress={openModal}
            style={[
              shadow(6),
              {
                alignSelf: 'center',
                borderRadius: APP_RATIO * 1.5,
                width: APP_RATIO * 3,
                height: APP_RATIO * 3,
                justifyContent: 'center',
                backgroundColor: 'blue',
                alignItems: 'center',
              },
            ]}>
            <Icon color="#fff" size={APP_RATIO * 2} name="plus" />
          </TouchableOpacity>
          {quest.questions &&
            quest.questions.map((question) => {
              return (
                <TouchableOpacity
                  onPress={() => openModal()}
                  key={Math.random()}
                  style={{
                    flexDirection: 'row',
                    height: APP_RATIO * 5,
                    marginTop: APP_RATIO,
                  }}>
                  <View style={{ flex: 2.5 }}>
                    <Image
                      source={
                        question.img
                          ? { uri: question.img }
                          : Images.picture
                      }
                      defaultSource={Images.picture}
                      style={{ height: APP_RATIO * 5, width: 'auto' }}
                    />
                  </View>
                  <View style={{ flex: 7.5, paddingLeft: APP_RATIO }}>
                    <AppTextBold numberOfLines={3}>{question.quiz}</AppTextBold>
                  </View>
                </TouchableOpacity>
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
  )
}

const _CreateQuestScreen = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return (
    <BaseScreen
      style={[styles.container, styles.center]}
      header={isAuthenticated ? CreateQuestScreenHeader : () => <></>}>
      {!isAuthenticated ? <WarningNotLogin /> : <CreateQuest />}
    </BaseScreen>
  )
}

export const CreateQuestScreen = _CreateQuestScreen

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
    // backgroundColor: 'red',
    backgroundColor: APP_COLORS.background,
    // paddingVertical: APP_RATIO
  },
})
