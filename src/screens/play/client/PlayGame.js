import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { BaseScreen, Answer, Header, AppHeader, AppTextBold } from '../../../components'
import { APP_COLORS, styles, APP_FONT_SIZES } from '../../../configs/theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { APP_RATIO } from '../../../configs/appConstants'

/**
 * 
 * @param {{ answer: Function, socketState: Object }} props 
 */
export const PlayGameScreen = (props) => {
  const { socketState, answer } = props
  const [time, setTime] = (new Date().getTime() / 1000.0).toFixed(2)
  const [bgColor, setBgColor] = useState('#fff')
  const answers = [
    {
      id: 0,
      color: APP_COLORS.red,
      label: 'A',
    },
    {
      id: 1,
      color: APP_COLORS.blue,
      label: 'B',
    },
    {
      id: 2,
      color: APP_COLORS.yellow,
      label: 'C',
    },
    {
      id: 3,
      color: APP_COLORS.green,
      label: 'D',
    },
  ]
  const [answered, setAnswered] = useState(false)

  const onAnswer = (_answer) => {
    if (answered) {
      return
    }
    let ans = {
      time: parseFloat((new Date().getTime() / 1000.0 - time).toFixed(2)),
      idAnswer: _answer.id,
      username: socketState.game.username,
    }
    answer(socketState.game.idGame, socketState.idQuestion, ans)
    setBgColor(_answer.color)
    setAnswered(true)
  }

  useEffect(() => {
    console.log(time)
    if (!time) {
      setTime((new Date().getTime() / 1000.0).toFixed(2))
    }
    return () => {
      if (!answered) {
        console.log(new Date().getTime())
        let ans = {
          time: parseFloat((new Date().getTime() / 1000.0 - time).toFixed(2)),
          idAnswer: -1,
          username: socketState.game.username,
        }
        answer(socketState.game.idGame, socketState.idQuestion, ans)
      }
      setTime(null)
    }
  }, [])

  return (
    <BaseScreen header={() => <AppHeader title="Trả lời câu hỏi" />}>
      {!answered ? (
        <>
          <View style={[styles.center, { backgroundColor: '#fff', flex: 1 }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Answer
                {...answers[0]}
                style={{ flex: 1 }}
                onPress={() => onAnswer(answers[0])}
              />
              <Answer
                {...answers[1]}
                style={{ flex: 1 }}
                onPress={() => onAnswer(answers[1])}
              />
            </View>
          </View>
          <View style={[styles.center, { backgroundColor: '#fff', flex: 1 }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Answer
                {...answers[2]}
                style={{ flex: 1 }}
                onPress={() => onAnswer(answers[2])}
              />
              <Answer
                {...answers[3]}
                style={{ flex: 1 }}
                onPress={() => onAnswer(answers[3])}
              />
            </View>
          </View>
        </>
      ) : (
        <View style={[styles.center, { backgroundColor: bgColor, flex: 1 }]}>
          <AppTextBold style={{ color: '#fff', fontSize: APP_FONT_SIZES.large }}>
            Bạn đã trả lời câu hỏi
          </AppTextBold>
          <AppTextBold style={{ color: '#fff', fontSize: APP_FONT_SIZES.large }}>
            Đang chờ đáp án...
          </AppTextBold>
        </View>
      )}
    </BaseScreen>
  )
}

export default PlayGameScreen
