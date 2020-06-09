import io from 'socket.io-client'
import React from 'react'
import { SOCKET_URL } from '../../configs/appConstants'
import { GAME_TYPES } from '../../configs/socketConstants'

/**
 * @returns {SocketIOClient.Socket}
 */
export const socketClient = async () => {
  const socket = io(SOCKET_URL)
  // await configSocket(socket)
  return socket
}

const { GAME } = GAME_TYPES

export const useSocket = () => {
  const [temp, setTemp] = React.useState(0)
  const [isConnected, setConnected] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [socket, setSocket] = React.useState(null)
  const [tik, setTik] = React.useState(0)
  const [store, setStore] = React.useState({
    running: false,
    players: [],
    idQuestion: -1,
    correct: 0,
    endGame: true,
    inGame: false,
    newQuestion: null
  })
  
  
  const socketReducer = async ({ type, payload }) => {
    console.log('==============type:', type)
    console.log('==============payload:', store)
    let newState = store
  
    switch (type) {
      case GAME.JOIN:
      case GAME.START:
      case GAME.TIMEOUT:
      case GAME.JOIN:
      case GAME.CORRECT_ANSWER:
      case GAME.BEGIN:
      case GAME.ANSWER:
      case GAME.SCOREBOARD:
      case GAME.NEW_QUESTION:
        newState = { ...newState, ...payload }
        break
      case GAME.END:
        newState = {
          ...newState,
          ...payload,
          idQuestion: -1,
          correct: 0,
          endGame: true,
          inGame: false,
        }
        break
      case GAME.NEW_PLAYER:
        let { players } = newState
        players.push(payload.player)
        newState = {
          ...newState,
          players,
        }
        break
      case GAME.RESET_STATUS:
        newState = {
          ...newState,
          result: false,
        }
      default:
        break
    }
    console.log('==============newState:', newState)
    setStore(newState)
    setTik(Date.now())
  }

  const configSocket = async (_socket) => {
    _socket.on(GAME.JOIN, (status, username, idGame) => {
      if (status) {
        socketReducer({
          type: GAME.JOIN,
          payload: {
            game: {
              status,
              username,
              idGame,
            },
          },
        })
      } else {
        setError('Không thể vào phòng, hãy thử lại!')
        setTimeout(() => {
          setError(null)
        }, 3000);
      }
    })

    _socket.on(GAME.START, (status, questions) => {
      if (status === STATUS.SUCCESS)
        socketReducer({
          type: GAME.START,
          payload: {
            result: true,
            running: false,
            questions,
          },
        })
    })

    _socket.on(GAME.TIMEOUT, () => {
      socketReducer({
        type: GAME.TIMEOUT,
        payload: {
          timeout: true,
          newQuestion: false,
          result: true,
          running: false,
        },
      })
    })
  
    _socket.on(GAME.NEW_QUESTION, idQuestion => {
      socketReducer({
        type: GAME.NEW_QUESTION,
        payload: {
          idQuestion,
          newQuestion: true,
          endGame: false,
          timeout: false,
          correct: 0,
          result: true,
          running: false,
        },
      })
    })
  
    _socket.on(GAME.ANSWER, scoreBoard => {
      socketReducer({
        type: GAME.ANSWER,
        payload: {
          players: scoreBoard,
          result: true,
          running: false,
        },
      })
    })
  
    _socket.on(GAME.CORRECT_ANSWER, res => {
      socketReducer({
        type: GAME.CORRECT_ANSWER,
        payload: {
          correct: res ? 1 : -1,
          result: false,
          running: false,
        },
      })
    })
  
    _socket.on(GAME.END, scoreBoard => {
      console.log(scoreBoard)
      socketReducer({
        type: GAME.END,
        payload: {
          players: scoreBoard,
          username: '',
        },
      })
    })
  }

  const getSocket = async () => {
    let sk = await socketClient()
    setSocket(sk)
  }
  React.useEffect(() => {
    if (!socket) {
      getSocket()
    }
  })

  React.useEffect(() => {
    if (!socket) {
      return
    }
    socket.removeAllListeners()
    socket.on('connect', () => {
      console.log('Connected to server!')
      setConnected(true)
    })
    socket.on('disconnect', () => setConnected(false))
    configSocket(socket, store)
  }, [socket, tik])

  return { socket, error, store }
}