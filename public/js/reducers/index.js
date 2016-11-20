import { combineReducers } from 'redux'
import auth from './auth'
import post from './post'
import combine from './combine'

const rootReducer = combineReducers({
  auth,
  post,
  combine,
})

export default rootReducer
