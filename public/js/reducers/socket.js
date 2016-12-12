import * as ActionTypes from '../actions/socket'

const initialState = {
  postTimeSocket: null
}

const socket = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_SOCKET_REQUEST:
      return {
        ...state,
        postTimeSocket: action.socket,
      }
    default:
      return state
  }
}

export default socket
