import React, { useState, useMemo } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { styles, APP_COLORS } from '../configs/theme'
import Images from '@assets/images'
import { AppTextBold } from './Text'
import _ from 'lodash'

/**
 * @param {{
    style: import('react-native').ViewStyle,
    quest: {
      image: string, 
      title: string,
      author: string,
      questions: Array
    }
  }} props
 */
export const QuestThumb = (props) => {
  const { height, width } = props.style
  const ratio = (height + width) / 100.0
  return (
    <View
      style={[
        styles.card,
        { flexDirection: 'column', display: 'flex', overflow: 'hidden' },
        props.style,
      ]}>
      <ImageBackground
        source={_.get(props, 'quest.image') || Images.picture}
        style={{ overflow: 'hidden', flex: 1.5 }}
        imageStyle={{ resizeMode: 'contain', margin: -ratio * 5, backgroundColor: '#fff' }}>
        <View
          style={{
            ...styles.center,
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            flex: 1,
            margin: ratio*2.5,
          }}>
          <Text
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: ratio * 2,
              padding: ratio * 2,
              fontFamily: 'OpenSans-Bold',
              color: '#fff',
            }}>
            {_.get(props, 'quest.questions.length') || '0'}Qs
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: ratio * 3,
        }}>
        <View style={{ flex: 3 }}>
          <AppTextBold style={{ fontSize: ratio * 4.5 }} numberOfLines={2}>
            Titledadjanjdkandjknajdnjaknjdkankdnjskank
          </AppTextBold>
        </View>
        <View style={{ flex: 1 }} numberOfLines={1}>
          <AppTextBold
            style={{ fontSize: ratio * 4, color: APP_COLORS.text.normal }}>
            Title
          </AppTextBold>
        </View>
      </View>
    </View>
  )
}
