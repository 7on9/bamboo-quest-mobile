import AsyncStorage from '@react-native-community/async-storage'
import { take, put, call, fork } from 'redux-saga/effects'

import axios from 'axios'
import { LOGIN_REQUEST } from '../actions/actionTypes'
import * as loginActions from '../actions/authAction'
import {
  BASE_API_URL as apiURL,
  FILE_USER_DATA,
  FILE_USER_TOKEN,
} from '../../configs/appConstants'
import { dataProvider } from '../../services/dataProvider'
import { errorMessage } from '../../utils/error'

const doLogin = async ({ email, password }) => {
  try {
    const response = await dataProvider('/User/login', {
      method: 'POST',
      data: {
        email,
        password,
      },
    })
    // OneSignal.sendTags(tagObj)
    // savePushInfomation(response.data.userId)
    return response
  } catch (error) {
    return {
      error: {
        message:
          errorMessage.user[error.data.statusCode].login ||
          errorMessage[error.data.statusCode],
      },
    }
  }
}

const saveUserInfo = async (data) => {
  await AsyncStorage.setItem(FILE_USER_TOKEN, data.token)
  await AsyncStorage.setItem(FILE_USER_DATA, JSON.stringify(data))
}

function* watchLoginRequest() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUEST)
    try {
      const payload = { email, password }
      const { data, error } = yield call(doLogin, payload)
      if (!error) {
        yield call(saveUserInfo, data)
        yield put(
          loginActions.loginSuccess({
            token: data.token,
            user: data.info,
          })
        )
      } else {
        yield put(loginActions.loginFailure({ error }))
        console.log('AUTH_ERR', error)
      }
    } catch (error) {
      console.log('AUTH_ERR', error)
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginRequest)
}
