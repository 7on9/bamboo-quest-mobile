import io from 'socket.io-client'
import { SOCKET_URL } from '../../configs/appConstants'

export const socketClient = () => {
  const socket = io(SOCKET_URL)
  socket.on('connect', (err, res) => console.log(err, res))
}
