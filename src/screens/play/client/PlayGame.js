import React from 'react'
import { View, Text } from 'react-native'
import { BaseScreen, Answer, Header, AppHeader } from '../../../components'
import { APP_COLORS } from '../../../configs/theme'

export const PlayGameScreen = props => {
  const { onAnswer } = props
  return (
    <BaseScreen header={() => (<AppHeader title="Trả lời câu hỏi" />)}>
      <View style={{ backgroundColor: '#000', flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Answer color={APP_COLORS.red} label="A" style={{ flex: 1 }} onPress={onAnswer}/>
          <Answer color={APP_COLORS.blue} label="B" style={{ flex: 1 }} onPress={onAnswer}/>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Answer color={APP_COLORS.yellow} label="C" style={{ flex: 1 }} onPress={onAnswer}/>
          <Answer color={APP_COLORS.green} label="D" style={{ flex: 1 }} onPress={onAnswer}/>
        </View>
      </View>
    </BaseScreen>
  )
}

export default PlayGameScreen
