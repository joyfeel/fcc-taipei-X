import util from 'util'
import { verifyToken } from '../utils/auth'
import { getCreatePostTime } from '../utils/mixed'

const list = {}
const removeSocketID = (list, socketID) => {
  let _userID
  Object.keys(list).forEach(userID => {
    list[userID].sockets = list[userID].sockets.filter(socket => {
      if (socket.id !== socketID) {
        return true
      }
      _userID = userID
    })
    if (list[userID].sockets.length === 0) {
      delete list[userID]
    }
  })
  return _userID
}

export default function(io) {
  const postTimeIO = io.of('/postTime')
  postTimeIO.on('connection', socket => {
    const socketID = socket.id
    socket.on('storeClientInfo', async ({ token }) => {
      try {
        const { userId, email } = await verifyToken(token)
        if (list[userId] === undefined) {
          list[userId] = {
            sockets: [],
            userInfo: {
              email: null,
            },
          }
        }
        list[userId].sockets.push(socket)
        list[userId].userInfo.email = email
        socket.join(userId)
        socket.broadcast.to(userId).emit('rooms', `socket ${socket.id} 進入了房間`)
        //console.log(util.inspect(list, { showHidden: false, depth: 3 }))
      } catch (e) {
        console.log('socket.io storeClientInfo error')
        console.log(e)
      }
    })
    socket.on('disconnect', () => {
      try {
        const userId = removeSocketID(list, socketID)
        socket.leave(userId)
        socket.broadcast.to(userId).emit('rooms', `socket ${socket.id} 退出了房間`)
      } catch (e) {
        console.log('socket.io disconnect error')
        console.log(e)
      }
    })
    socket.on('post', async ({ token }) => {
      try {
        const { userId } = await verifyToken(token)
        const create_post_time = await getCreatePostTime(userId)
        postTimeIO.in(userId).emit('postTime', {
          msg: 'You can not post article in 3 minutes',
          create_post_time,
        })
      } catch (e) {
        console.log('socket.io post error')
        console.log(e)
      }
    })
  })
}
