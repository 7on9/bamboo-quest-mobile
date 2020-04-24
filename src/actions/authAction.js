import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOG_OUT,
  RESET_ERROR,
} from './actionTypes'

export const resetError = () => {
  return {
    type: RESET_ERROR,
  }
}

export const loginRequest = (username, password) => {
  return {
    type: LOGIN_REQUEST,
    username,
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

export const loginFailure = err => {
  // debugger;
  return {
    type: LOGIN_FAILED,
    err,
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT,
  }
}
