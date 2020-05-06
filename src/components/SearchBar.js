import React, { useState, useRef, useMemo, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import { styles, APP_COLORS, appBorderRadius, APP_FONT_SIZES } from '../configs/theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import { APP_RATIO, APP_SIZE } from '../configs/appConstants'
import { AppTextBold } from './Text'

export const SearchBar = (props) => {
  const [widthInputBar, setWidthInputBar] = useState(100)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!inputRef.current.isFocused()) {
      return
    }
    setWidthInputBar(input.length ? 75 : 85)
  }, [input.length])

  return (
    <View style={[{ flexDirection: 'row', }, props.style]}>
      <TextInput
        ref={inputRef}
        style={{
          width: `${widthInputBar}%`,
          height: '100%',
          backgroundColor: '#fff',
          padding: APP_RATIO * 0.5,
          borderTopLeftRadius: appBorderRadius,
          borderTopRightRadius: input.length ? 0 : APP_RATIO * 0.5,
          borderBottomRightRadius: input.length ? 0 : APP_RATIO * 0.5,
          borderBottomLeftRadius: appBorderRadius,
          fontSize: APP_FONT_SIZES.normal,
        }}
        value={input}
        onChangeText={(val) => {
          setInput(val)
        }}
        onFocus={() => setWidthInputBar(input.length ? 75 : 85)}
        placeholder="Tìm kiếm thử thách"
        onBlur={() => {
          if (!input.length) {
            setWidthInputBar(100)
          }
        }}
        autoFocus={false}
      />
      {input.length ? (
        <View
          onTouchStart={() => {
            setWidthInputBar(85)
            setInput('')
          }}
          style={[
            {
              width: '11%',
              marginLeft: -APP_SIZE.widthScreen*0.011,
              height: Platform.select({ android: '100%', ios: '101%' }),
              // padding: APP_RATIO * 0.5,
              backgroundColor: '#fff',
              borderTopRightRadius: appBorderRadius,
              borderBottomRightRadius: appBorderRadius,
            },
            styles.center,
          ]}>
          <Icon name="remove" size={APP_FONT_SIZES.header} color={APP_COLORS.text.normal} />
        </View>
      ) : null}
      <TouchableOpacity
        style={[
          styles.center,
          {
            width: `${100 - widthInputBar - (input.length ? 10 : 0)}%`,
            display: widthInputBar == 100 ? 'none' : 'flex',
          },
        ]}
        onPress={() => {
          setWidthInputBar(100)
          setInput('')
          inputRef.current.blur()
        }}>
        <AppTextBold
          style={{
            color: '#fff',
            fontSize: APP_FONT_SIZES.normal,
            marginRight: -APP_RATIO,
          }}>
          Hủy
        </AppTextBold>
      </TouchableOpacity>
    </View>
  )
}
