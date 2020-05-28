import io from 'socket.io-client'
import { SOCKET_URL } from '../../configs/appConstants'

export const socketClient = async () => {
  const socket = io(SOCKET_URL)
  await configSocket(socket)
  return socket
}

/**
 *
 * @param {SocketIOClient.Socket} socket
 */
const configSocket = (socket) => {
  socket.on('connect', (err, res) => console.log(err, res))
}
