import * as ActionTypes from '../actions/combine'

const initialState = {
  isFetching: false,
  findOlderFetching: false,
}

const combine = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SENDING_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case ActionTypes.SENDING_REQUEST_FIND_OLDER_POST:
      return {
        ...state,
        findOlderFetching: true,
      }
    case ActionTypes.CANCEL_REQUEST:
      return {
        ...state,
        isFetching: false,
      }
    case ActionTypes.CANCEL_REQUEST_FIND_OLDER_POST:
      return {
        ...state,
        findOlderFetching: false,
      }
    default:
      return state
  }
}

export default combine
