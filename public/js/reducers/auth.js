import { SENDING_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from '../actions'

const initialState = {
  isFetching: false,
  profile: {
    token: null,
    id: null,
    nickname: null,
    email: null,
    avatar: null,
    edit_nickname_time: null,
    created_time: null,
    updated_time: null
  },
  error: null
}

const auth = (state = initialState, action) => {
  switch(action.type) {
    case SENDING_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case SIGNIN_SUCCESS:
      const { auth } = action.response
      return {
        ...state,
        profile: auth,
        isFetching: false
      }
    case SIGNIN_FAILURE:
      const error = {
        message: action.error.message
      }
      return {
        ...state,
        error,
        isFetching: false
      }
    default:
      return state
  }
}

export default auth
