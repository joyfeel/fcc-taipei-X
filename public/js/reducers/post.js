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
    default:
      return state
  }
}

export default post
