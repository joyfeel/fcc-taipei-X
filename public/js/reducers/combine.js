import * as ActionTypes from '../actions/combine'

const initialState = {
  isFetching: false,
}

const combine = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SENDING_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case ActionTypes.CANCEL_REQUEST:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}

export default combine
