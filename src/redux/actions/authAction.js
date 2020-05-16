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
  // debugger;
  return {
    type: LOGIN_FAILED,
    error,
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT,
  }
}
