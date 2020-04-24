import {
  NETWORK_CHANGE_STATE,
  LANGUAGE_CHANGE_LOCALE,
  LANGUAGE_TOGGLE_LOCALE,
} from '../actions/actionTypes'

const initialState = {
  isConnected: true,
  locale: 'vi',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_CHANGE_STATE: {
      return Object.assign({}, state, { isConnected: action.isConnected })
    }
    case LANGUAGE_CHANGE_LOCALE: {
      return Object.assign({}, state, { locale: action.locale })
    }
    case LANGUAGE_TOGGLE_LOCALE: {
      const newState = state.locale == 'vi' ? 'en' : 'vi'
      return Object.assign({}, state, { locale: newState })
    }
  }
  return state
}
