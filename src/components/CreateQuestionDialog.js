import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import { AppModal } from './Modal'
import { AppTextBold, AppText } from './Text'
import { APP_FONT_SIZES, styles, APP_COLORS } from '../configs/theme'
import { APP_RATIO, APP_SIZE } from '../configs/appConstants'
import { Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Images from '@assets/images'
import { shadow } from 'react-native-shadow-creator/shadow'

const CreateQuestionDialog = (props) => {
  const { modalVisible, setModalVisible } = props
  const [image, setImage] = useState(null)
  const [answer, setAnswer] = useState([])
  const [question, setQuestion] = useState(props.question || {
    quiz: '',
    answer: [],
  })

  const handleChoosePhoto = () => {
    const options = {}
    try {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri) {
          setImage(response)
          setQuestion((_question) => ({
            ..._question,
            img_path: response.data,
            img: response.uri,
          }))
          // this.setState({ photo: response });
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const resetContent = () => {
    setImage(null)
    setAnswer([])
    setQuestion({ quiz: '', answer: [] })
  }

  const onChangeText = (name, value) => {
    setQuestion((_question) => ({ ..._question, [name]: value }))
  }

  const onChangeAnswerText = (i, value) => {
    setAnswer((_answer) => {
      _answer[i] = value
      return _answer
    })
  }

  const onAddQuestion = () => {
    props.onAddQuestion({ ...question, answer })
  }

  return (
    <AppModal visible={modalVisible}>
      <View
        style={[
          styles.center,
          styles.card,
          {
            height: 'auto',
            width: APP_SIZE.widthWindow - APP_RATIO * 2,
            padding: APP_RATIO,
            backgroundColor: '#fff',
            borderRadius: APP_RATIO / 4,
          },
        ]}>
        <View style={[styles.center, { width: '100%' }]}>
          <AppTextBold style={{ fontSize: APP_FONT_SIZES.header }}>
            Tạo câu hỏi
          </AppTextBold>
        </View>
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={{
            height: APP_SIZE.widthWindow / 2,
            width: APP_SIZE.widthWindow - APP_RATIO * 4,
            paddingTop: APP_RATIO / 2,
            marginBottom: APP_RATIO * 1.5,
          }}>
          <Image
            source={image && image.uri ? { uri: image.uri } : Images.picture}
            resizeMode="cover"
            style={{
              height: APP_SIZE.widthWindow / 2,
              width: APP_SIZE.widthWindow - APP_RATIO * 4,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: APP_SIZE.widthWindow - APP_RATIO * 4,
            marginTop: APP_RATIO,
          }}>
          <AppTextBold style={{ fontSize: APP_FONT_SIZES.normal }}>
            Câu hỏi
            <AppText style={{ color: 'gray' }}>
              {' '}
              {question.quiz.length}/150
            </AppText>
          </AppTextBold>
          <TextInput
            onChangeText={(value) => onChangeText('quiz', value)}
            maxLength={150}
            multiline={true}
            scrollEnabled={true}
            style={[
              shadow(2),
              {
                width: APP_SIZE.widthWindow - APP_RATIO * 4,
                height: APP_RATIO * 6,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#fff',
                padding: APP_RATIO,
                marginTop: APP_RATIO / 2,
                marginBottom: APP_RATIO,
              },
            ]}
          />
        </View>
        <View style={{ width: '100%' }}>
          {[
            { label: 'A', color: APP_COLORS.red },
            { label: 'B', color: APP_COLORS.blue },
            { label: 'C', color: APP_COLORS.yellow },
            { label: 'D', color: APP_COLORS.green },
          ].map((ans, idx) => {
            return (
              <View
                key={idx}
                style={[
                  styles.card,
                  {
                    height: APP_RATIO * 5,
                    padding: APP_RATIO / 2,
                    backgroundColor: ans.color,
                    marginTop: APP_RATIO / 2,
                    flexDirection: 'row',
                  },
                ]}>
                <View style={[styles.center, { flex: 1 }]}>
                  <AppText style={{ color: '#fff' }}>{ans.label}</AppText>
                </View>
                <View style={[styles.center, { flex: 9 }]}>
                  <TextInput
                    onChangeText={(txt) => onChangeAnswerText(idx, txt)}
                    style={{
                      height: APP_RATIO * 4,
                      width: '100%',
                      color: '#fff',
                    }}
                  />
                </View>
              </View>
            )
          })}
        </View>
        <View
          style={{ width: '100%', flexDirection: 'row', marginTop: APP_RATIO }}>
          <TouchableOpacity
            style={[
              styles.center,
              {
                ...styles.openButton,
                backgroundColor: '#f0f0f0f0',
                height: APP_RATIO * 5,
                borderRadius: APP_RATIO / 4,
                marginRight: APP_RATIO / 2,
                flex: 1,
                // margin: APP_RATIO
              },
            ]}
            onPress={() => {
              setModalVisible(!modalVisible)
              resetContent()
            }}>
            <AppTextBold style={{ color: 'gray' }}>Hủy</AppTextBold>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.center,
              {
                ...styles.openButton,
                backgroundColor: APP_COLORS.main,
                height: APP_RATIO * 5,
                borderRadius: APP_RATIO / 4,
                flex: 1,
                marginLeft: APP_RATIO / 2,
                // margin: APP_RATIO
              },
            ]}
            onPress={() => {
              onAddQuestion()
              setModalVisible(!modalVisible)
              resetContent()
            }}>
            <AppTextBold style={{ color: '#fff' }}>Tạo câu hỏi</AppTextBold>
          </TouchableOpacity>
        </View>
      </View>
    </AppModal>
  )
}

export default CreateQuestionDialog

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    height: 100,
    width: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
