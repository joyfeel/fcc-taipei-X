import * as ActionTypes from '../actions/post'
import codeTable from '../utils/apicode'

const initialState = {
  newPost: null,
  postList: [],
}

const post = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        newPost: action.response.post,
        postList: [
          action.response.post,
          ...state.postList,
        ],
      }
    case ActionTypes.PRESENT_POST_SUCCESS:
      return {
        ...state,
        postList: [
          ...action.response.posts,
          ...state.postList,
        ],
      }
    case ActionTypes.FIND_OLDER_POST_SUCCESS:
      return {
        ...state,
        postList: [
          ...state.postList,
          ...action.response.posts,
        ],
      }
    case ActionTypes.FIND_OLDER_POST_FAILURE:
    case ActionTypes.PRESENT_POST_FAILURE:
      return state
    default:
      return state
  }
}

export default post
