import React from 'react'
import { View, Text } from 'react-native'
import { BaseScreen, Answer, AppTextBold } from '../../../components'
import { APP_COLORS, styles, APP_FONT_SIZES } from '../../../configs/theme'
import { APP_SIZE, APP_RATIO } from '../../../configs/appConstants'
import Icon from 'react-native-vector-icons/FontAwesome5'

export const ResultScreen = (props) => {
  const { result } = props
  return (
    <BaseScreen header={() => null}>
      <View
        style={[
          styles.center,
          { backgroundColor: result ? '#138402' : '#ad1d1d', flex: 1 },
        ]}>
        <View>
          <Icon
            name={result ? 'laugh' : 'sad-tear'}
            size={APP_SIZE.widthScreen * 0.5}
            color="#fff"
          />
        </View>
        <View style={{ marginTop: APP_RATIO }}>
          <AppTextBold
            style={{ fontSize: APP_FONT_SIZES.xLarge, color: '#fff' }}>
            {result ? 'Đúng rồi' : 'Sai rồi'}
          </AppTextBold>
        </View>
      </View>
    </BaseScreen>
  )
}

export default ResultScreen
