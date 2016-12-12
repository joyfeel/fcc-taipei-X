import { combineReducers } from 'redux'
import auth from './auth'
import posts from './posts'
import combine from './combine'
import socket from './socket'

const appReducer = combineReducers({
  auth,
  posts,
  combine,
  socket,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_NORMAL') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
