import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Fumi } from 'react-native-textinput-effects'
import { View, Text } from 'react-native'
import { styles, APP_FONT_SIZES, APP_COLORS } from '../configs/theme'
import { APP_RATIO } from '../configs/appConstants'
import { shadow } from 'react-native-shadow-creator/shadow'

/**
 * 
 * @param {{
  ref,
  label,
  textContentType,
  iconName,
  secureTextEntry,
  autoFocus,
  onChangeText,
  height,
  style,
  inputStyle
 }} props 
 */
export const Input = (props) => {
  const {
    ref,
    label,
    textContentType,
    iconName,
    secureTextEntry,
    autoFocus,
    onChangeText,
    style,
    height,
    inputStyle,
  } = props
  return (
    <Fumi
      ref={ref}
      label={label}
      numberOfLines={1}
      iconColor={APP_COLORS.main}
      iconName={iconName}
      height={APP_RATIO * 3.5}
      iconWidth={APP_RATIO * 5}
      iconSize={APP_RATIO * 2.5}
      iconClass={FontAwesomeIcon}
      autoFocus={autoFocus || false}
      inputPadding={APP_RATIO * 2.25}
      secureTextEntry={secureTextEntry || false}
      textContentType={textContentType || 'none'}
      onChangeText={onChangeText}
      multiline={false}
      maxLength={32}
      textAlignVertical="center"
      {...props}
      inputStyle={[{
        fontSize: APP_FONT_SIZES.header,
        textAlignVertical: 'center',
      }, inputStyle]}
      style={[
        styles.card,
        {
          height: APP_RATIO * 3,
          width: '100%',
          justifyContent: 'center',
          fontSize: APP_FONT_SIZES.header,
        },
        style
      ]}
    />
  )
}
