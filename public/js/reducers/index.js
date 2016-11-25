import { combineReducers } from 'redux'
import auth from './auth'
import posts from './posts'
import combine from './combine'

const appReducer = combineReducers({
  auth,
  posts,
  combine,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_NORMAL') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
