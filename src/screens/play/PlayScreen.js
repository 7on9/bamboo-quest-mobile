import React, { useMemo, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import EntryScreen from './EntryScreen'
import { SOCKET_URL } from '../../configs/appConstants'
import { socketClient } from './socket'

const _PlayScreen = () => {
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    if (!socket) {
      setSocket(socketClient())
    }
    return () => {
      
    }
  }, [])

  return (
    <EntryScreen socket={socket} />
  )
}

export const PlayScreen = _PlayScreen 
