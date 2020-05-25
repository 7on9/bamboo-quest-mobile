import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import EntryScreen from './EntryScreen'
import { SOCKET_URL } from '../../configs/appConstants'
import { socketClient } from './socket'

const _PlayScreen = () => {
  const socket = socketClient()
  return (
    <EntryScreen socket={socket} />
  )
}

export const PlayScreen = _PlayScreen 
