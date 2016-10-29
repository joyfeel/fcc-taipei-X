import { combineReducers } from 'redux'
import auth from './auth'
import post from './post'

const rootReducer = combineReducers({
  auth,
  post,
})

export default rootReducer
