import { combineReducers } from 'redux'
import auth from './auth'
import popup from './popup'
import posts from './posts'
import combine from './combine'
import socket from './socket'
import slider from './slider'
import comment from './comment'

const appReducer = combineReducers({
  auth,
  popup,
  posts,
  combine,
  socket,
  slider,
  comment,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_NORMAL') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
