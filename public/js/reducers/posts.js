import * as ActionTypes from '../actions/post'
import codeTable from '../utils/apicode'

const initialState = []

const post = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_POST_SUCCESS:
      return {
        ...action.response.post,
        visibility: true,
      }
    case ActionTypes.PRESENT_POST_SUCCESS:
    case ActionTypes.FIND_OLDER_POST_SUCCESS:
      return {
        ...state,
        visibility: true,
      }
    case ActionTypes.FIND_NEWER_POST_SUCCESS:
      return {
        ...state,
        visibility: false,
      }
    case ActionTypes.DISPLAY_NEWER_POST:
      if (state.visibility === true) {
        return state
      }
      return {
        ...state,
        visibility: true,
      }
    default:
      return state
  }
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_POST_SUCCESS:
      return [
        post(undefined, action),
        ...state,
      ]
    case ActionTypes.PRESENT_POST_SUCCESS:
    case ActionTypes.FIND_OLDER_POST_SUCCESS:
      return [
        ...state,
        ...action.response.posts.map(p => post(p, action)),
      ]
    case ActionTypes.FIND_NEWER_POST_SUCCESS:
      return [
        ...action.response.posts.map(p => post(p, action)),
        ...state,
      ]
    case ActionTypes.DISPLAY_NEWER_POST:
      return state.map(p => post(p, action))
    case ActionTypes.CREATE_POST_FAILURE:
    case ActionTypes.FIND_NEWER_POST_FAILURE:
    case ActionTypes.FIND_OLDER_POST_FAILURE:
    case ActionTypes.PRESENT_POST_FAILURE:
      return state
    default:
      return state
  }
}

export default posts
