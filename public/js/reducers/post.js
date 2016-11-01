import * as ActionTypes from '../actions/post'
import codeTable from '../utils/apicode'

const initialState = {
  isFetching: false,
  newPost: null,
  postList: [],
}

const post = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SENDING_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case ActionTypes.CANCEL_POST_REQUEST:
      return {
        ...state,
        isFetching: false,
      }
    case ActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        newPost: action.response.post,
        postList: [
          action.response.post,
          ...state.postList
        ],
        isFetching: false,
      }
    default:
      return state
  }
}

export default post
