import { combineReducers } from 'redux'
import counter from './counter'
import auth from './auth'

const rootReducer = combineReducers({
  counter,
  auth
})

export default rootReducer
