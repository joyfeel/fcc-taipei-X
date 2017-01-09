import * as ActionTypes from '../actions/combine'

const initialState = {
  isFetching: false,
  findOlderFetching: false,
  isPostformOpen: false,
  editPost: null,
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
    case ActionTypes.POSTFORM_OPEN:
      return {
        ...state,
        isPostformOpen: true,
      }
    case ActionTypes.POSTFORM_CLOSE:
      return {
        ...state,
        isPostformOpen: false,
      }
    case ActionTypes.EDITFORM_OPEN:
      return {
        ...state,
        isPostformOpen: true,
        editPost: action.post,
      }
    case ActionTypes.EDITFORM_CLOSE:
      return {
        ...state,
        isPostformOpen: false,
        editPost: null,
      }
    default:
      return state
  }
}

export default combine
