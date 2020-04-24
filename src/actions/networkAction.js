import { NETWORK_CHANGE_STATE } from './actionTypes'

export const changeNetworkState = isConnected => ({
  type: NETWORK_CHANGE_STATE,
  isConnected,
})
