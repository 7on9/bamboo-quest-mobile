import AsyncStorage from '@react-native-community/async-storage'
import { take, put, call, fork } from 'redux-saga/effects'

import axios from 'axios'
import { LOGIN_REQUEST } from '../actions/actionTypes'
import * as loginActions from '../actions/authAction'
import {
  BASE_API_URL as apiURL,
  FILE_USER_DATA,
  FILE_USER_TOKEN,
} from '../configs/appConstants'

const doLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(apiURL + '/User/login', {
      email,
      password,
    })
    console.log(response)
    await AsyncStorage.setItem(
      FILE_USER_TOKEN,
      JSON.stringify(response.data.token)
    )
    await AsyncStorage.setItem(
      FILE_USER_INFO,
      JSON.stringify(response.data.token)
    )
    // OneSignal.sendTags(tagObj)
    // savePushInfomation(response.data.userId)
    return response
  } catch (error) {
    console.log(error)
    return { err: { message: error.response.data.error.message } }
  }
}

const saveUserInfo = async data => {
  await AsyncStorage.setItem(FILE_USER_DATA, JSON.stringify(data))
}

function* watchLoginRequest() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUEST)
    try {
      const payload = { email, password }
      const { data, err } = yield call(doLogin, payload)
      console.log(data)
      if (!err) {
        yield call(saveUserInfo, data.data)
        yield put(
          loginActions.loginSuccess({
            accessToken: data.accessToken,
            user: data.info,
          })
        )
      } else {
        yield put(loginActions.loginFailure({ err }))
        console.log('AUTH_ERR', err)
      }
    } catch (err) {
      console.log('AUTH_ERR', err)
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginRequest)
}
