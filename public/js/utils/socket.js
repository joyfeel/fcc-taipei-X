import io from 'socket.io-client'
import auth from './auth'

export function connectPostTimeSocket() {
  const socket = io.connect('/postTime')
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit('storeClientInfo', {
        token: auth.getToken(),
      })
      resolve(socket)
    })
  })
}
