import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOG_OUT,
  RESET_ERROR,
  VERIFY,
} from './actionTypes'
import AsyncStorage from '@react-native-community/async-storage'
import { FILE_USER_DATA, FILE_USER_TOKEN } from '../../configs/appConstants'

export const resetError = () => {
  return {
    type: RESET_ERROR,
  }
}

export const loginRequest = (email, password) => {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  }
}

export const loginSuccess = ({ token, user }) => {
  return {
    type: LOGIN_SUCCESS,
    token,
    user,
  }
}

export const loginFailure = error => {
  return {
    type: LOGIN_FAILED,
    error,
  }
}

export const logOut = () => {
  AsyncStorage.removeItem(FILE_USER_DATA)
  AsyncStorage.removeItem(FILE_USER_TOKEN)
  return {
    type: LOG_OUT,
  }
}

export const verify = ({ token, user }) => {
  return {
    type: VERIFY,
    token,
    user,
  }
}
