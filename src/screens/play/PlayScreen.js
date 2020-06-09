import React, { useMemo, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import EntryScreen from './EntryScreen'
import { SOCKET_URL } from '../../configs/appConstants'
import { socketClient } from './socket'
import { GAME_TYPES } from '../../configs/socketConstants'
import { WelcomeScreen, PlayGameScreen, ResultScreen } from './client'
import { useSocket } from './socket'

const GAME = GAME_TYPES.GAME
const STATUS = GAME_TYPES.STATUS

export const PlayScreen = () => {
  const { socket, store, error } = useSocket()

  try {
    console.log('-----aaa-------', store)
    console.log('-----sss-------',store.game.idGame)
    
  } catch (error) {
    
  }
  return (
    store.game && store.game.idGame 
      ? <WelcomeScreen socket={socket} socketState={store} error={error}/>
      // : <ResultScreen socket={socket} socketState={store} error={error}/>
      : <PlayGameScreen socket={socket} socketState={store} error={error}/>
      // : <EntryScreen socket={socket} socketState={store} error={error}/>
  )
}
