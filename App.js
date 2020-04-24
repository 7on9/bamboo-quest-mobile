import React, { useMemo, useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Platform,
  Image,
  FlatList,
} from 'react-native'

// import { APP_SIZE } from './src/configs/constants'
import { Provider, useSelector, useDispatch } from 'react-redux'
import storeConfig from './src/configs/reduxConfig'
import i18n from './src/i18n/i18n'
import AsyncStorage from '@react-native-community/async-storage'
import { RootNav } from './src/configs/appNavigation'
import { changeLocale } from './src/actions/languageAction'
import { LANGUAGE_CHANGE_LOCALE } from './src/actions/actionTypes'

const LocaleProvider = (props) => {
  const loadLocale = async () => {
    let locale = await AsyncStorage.getItem(FILE_LOCALE)
    locale = locale || 'vi'
    i18n.locale = locale
    props.selectLanguage(locale)
  }

  const locale = useSelector(state => state.appConfig.locale)
  const dispatch = useDispatch()
  // const [locale, setLocale] = useState('vi')
  useEffect(() => {
    console.log('=====', props)
    if (props && props.locale == locale) {
      return
    }
    dispatch({ type: LANGUAGE_CHANGE_LOCALE, payload: locale })
    i18n.locale = locale
  }, [props])

  return (
    <RootNav screenProps={{ locale }} />
  )
}

const App = () => {
  return (
    <Provider store={storeConfig()}> 
      <View style={{ flex: 1,}}>
        <LocaleProvider />
      </View>
    </Provider>
  )
}

export default App
