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
    category: {
      image: string, 
      title: string,
      author: string,
      categoryions: Array
    }
  }} props
 */
export const CategoryThumb = (props) => {
  const { height, width } = props.style
  const ratio = (height + width) / 100.0
  return (
    <TouchableOpacity
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
        source={_.get(props, 'category.image') || Images.picture}
        style={{
          overflow: 'hidden',
          flex: 1.5,
          alignItems: 'center',
          // alignItems: 'flex-end',
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
            width: '90%',
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
            {_.get(props, 'category.name') || _.get(props, 'category.description')}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
