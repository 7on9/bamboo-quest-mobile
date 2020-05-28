import React, { useState, useMemo } from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { styles, APP_COLORS } from '../configs/theme'
import Images from '@assets/images'
import { AppText, AppTextBold } from './Text'
import _ from 'lodash'
import { objectIdToDate } from '../utils/date'
import { DEFAULT_DATE_FORMAT } from '../configs/appConstants'

/**
 * @param {{
    style: import('react-native').TouchableOpacityStyle,
    quest: {
      image: string, 
      title: string,
      author: string,
      questions: Array
    },
    ...import('react-native').TouchableOpacityProps
  }} props
 */
export const QuestThumb = (props) => {
  const { height, width } = props.style
  const ratio = (height + width) / 100.0
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.card,
        {
          flexDirection: 'column',
          display: 'flex',
          overflow: 'hidden',
          backgroundColor: '#fff',
        },
        props.style,
      ]}>
      <ImageBackground
        defaultSource={Images.picture}
        source={_.get(props, 'quest.image') || Images.picture}
        style={{
          overflow: 'hidden',
          flex: 1.5,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
        imageStyle={{
          resizeMode: 'contain',
          margin: -ratio * 10,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            ...styles.center,
            margin: ratio * 2.5,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: ratio * 2,
          }}>
          <Text
            style={{
              borderColor: '#fff',
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
            {props.quest.title || ''}
          </AppTextBold>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <AppText
            numberOfLines={1}
            style={{
              fontSize: ratio * 3,
              color: APP_COLORS.text.normal,
              flex: 1,
            }}>
            {props.quest.author || ''}
          </AppText>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <AppText
              numberOfLines={1}
              style={{
                fontSize: ratio * 3,
                color: APP_COLORS.text.normal,
              }}>
              {props.quest._id
                ? objectIdToDate(props.quest._id).toLocaleDateString('VN')
                : ''}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
