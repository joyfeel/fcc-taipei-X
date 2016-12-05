import * as ActionTypes from '../actions/combine'

const initialState = {
  isFetching: false,
  findOlderFetching: false,
}

const combine = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SENDING_REQUEST:
      if(action.fetch === undefined) {
        return {
          ...state,
          isFetching: true,
        }
      } else {
        return {
          ...state,
          ...action.fetch,
        }
      }
    case ActionTypes.CANCEL_REQUEST:
        if(action.fetch === undefined) {
          return {
            ...state,
            isFetching: false,
          }
        } else {
          return {
            ...state,
            ...action.fetch,
          }
        }
    default:
      return state
  }
}

export default combine
