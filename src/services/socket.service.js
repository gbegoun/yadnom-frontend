import io from 'socket.io-client'
import { userService } from './user'

export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'
export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
export const SOCKET_EVENT_REVIEW_ADDED = 'review-added'
export const SOCKET_EVENT_REVIEW_REMOVED = 'review-removed'
export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you'

// Actual socket events
export const SOCKET_EVENT_BOARD_UPDATED = 'board-updated'
export const SOCKET_EVENT_LEAVE_BOARD = 'leave-board'
export const SOCKET_EVENT_JOIN_BOARD = 'join-board'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const { DEV } = import.meta.env
const baseUrl = (import.meta.env.PROD) ? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()

// Real socket service for production use
// eslint-disable-next-line no-unused-vars
function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      console.log('Socket.io connecting to:', baseUrl)
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id)
      })
      socket.on('disconnect', () => {
        console.log('Socket disconnected')
      })
      const user = userService.getLoggedinUser()
      if (user) this.login(user._id)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}

// function createDummySocketService() {
//   var listenersMap = {}
//   const socketService = {
//     listenersMap,
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       this.setup()
//     },
//     login() {
//       console.log('Dummy socket service here, login - got it')
//     },
//     logout() {
//       console.log('Dummy socket service here, logout - got it')
//     },
//     on(eventName, cb) {
//       listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
//     },
//     emit(eventName, data) {
//       var listeners = listenersMap[eventName]
//       if (eventName === SOCKET_EMIT_SEND_MSG) {
//         listeners = listenersMap[SOCKET_EVENT_ADD_MSG]
//       }

//       if (!listeners) return

//       listeners.forEach(listener => {
//         listener(data)
//       })
//     },
//     // Functions for easy testing of pushed data
//     testChatMsg() {
//       this.emit(SOCKET_EVENT_ADD_MSG, { from: 'Someone', txt: 'Aha it worked!' })
//     },
//     testUserUpdate() {
//       this.emit(SOCKET_EVENT_USER_UPDATED, { ...userService.getLoggedinUser(), score: 555 })
//     }
//   }
//   window.listenersMap = listenersMap
//   return socketService
// }


/* Socket functions for board management */
export function joinBoard(boardId) {
  console.log('Joining board room:', boardId)
  socketService.emit(SOCKET_EVENT_JOIN_BOARD, boardId)
}

export function leaveBoard(boardId) {
  console.log('Leaving board room:', boardId)
  socketService.emit(SOCKET_EVENT_LEAVE_BOARD, boardId)
}

export function onBoardUpdated(cb) {
  console.log('Registering board-updated listener')
  socketService.on(SOCKET_EVENT_BOARD_UPDATED, cb)
}
export function offBoardUpdated(cb) {
  console.log('Removing board-updated listener')
  socketService.off(SOCKET_EVENT_BOARD_UPDATED, cb)
}


// Basic Tests
// function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)
