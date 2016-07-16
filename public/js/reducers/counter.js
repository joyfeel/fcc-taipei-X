//import * as types from '../constants/counter'
import { INCREMENT, DECREMENT } from '../constants/counter'

export default function counter (state = 0, action) {
  switch(action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
