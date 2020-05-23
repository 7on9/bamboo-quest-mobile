import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOG_OUT,
  RESET_ERROR,
  VERIFY,
} from '../actions/actionTypes'
import AsyncStorage from '@react-native-community/async-storage'
import { FILE_USER_TOKEN, FILE_USER_DATA } from '../../configs/appConstants'
const initialState = {
  isAuthenticated: false,
  isFetching: '',
  token: '',
  user: {},
  errorMessage: '',
  isValidToken: false,
  isNetworkConnected: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isFetching: true,
        isValidToken: false,
        errorMessage: '',
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
        isValidToken: true,
        errorMessage: '',
      })
    case VERIFY:
      return Object.assign({}, state, {
        isAuthenticated: action.token ? true : false,
        token: action.token,
        user: action.user,
        isValidToken: action.token ? true : false,
        errorMessage: action.token ? '' : 'Lỗi xác thực.',
      })
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error.error.message,
      })
    case RESET_ERROR:
      return Object.assign({}, state, {
        errorMessage: '',
      })
    case LOG_OUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isFetching: '',
        token: '',
        user: {},
        errorMessage: '',
      })
    default:
      return state
  }
}
