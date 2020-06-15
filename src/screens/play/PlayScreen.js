import React, { useMemo, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import EntryScreen from './EntryScreen'
import { SOCKET_URL } from '../../configs/appConstants'
import { socketClient } from './socket'
import { GAME_TYPES } from '../../configs/socketConstants'
import { WelcomeScreen, PlayGameScreen, ResultScreen } from './client'
import { useSocket } from './socket'
import { RankScreen } from './RankScreen'

const GAME = GAME_TYPES.GAME
const STATUS = GAME_TYPES.STATUS

export const PlayScreen = () => {
  const { socket, store, error, actions } = useSocket()
  const {
    game,
    running,
    players,
    idQuestion,
    correct,
    endGame,
    inGame,
    newQuestion,
    result,
    timeout,
    started,
    scoreBoard,
  } = store

  const { joinGame, answer, } = actions
  return scoreBoard ? (
    <RankScreen socketState={store} />
    ) : !inGame ? (
      // <PlayGameScreen socket={socket} socketState={store} error={error}/>
    <EntryScreen socket={socket} socketState={store} error={error} />
  ) : !started ? (
    <WelcomeScreen socket={socket} socketState={store} error={error} />
  ) : !timeout ? (
    <PlayGameScreen answer={answer} socketState={store} />
  ) : (
    <ResultScreen correct={correct} />
  )
  //   <WelcomeScreen socket={socket} socketState={store} error={error} />
  // ) : (
  //   // :
  //   // : <ResultScreen socket={socket} socketState={store} error={error}/>
  //   <EntryScreen socket={socket} socketState={store} error={error} />
  // )
}
