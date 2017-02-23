import * as ActionTypes from '../actions/comment'


const initialState = []


const comment = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COMMENT_SUCCESS:
      return [
        ...state,
        ...action.response.comment,
      ]
    case ActionTypes.GET_COMMENT_FAILURE:
      return state
    default:
      return state
  }
}

export default comment
