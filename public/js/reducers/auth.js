import * as ActionTypes from '../actions/auth'

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
    case ActionTypes.SENDING_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case ActionTypes.CANCEL_REQUEST:
      return {
        ...state,
        isFetching: false
      }
    case ActionTypes.SIGNIN_SUCCESS:
    case ActionTypes.REFRESH_TOKEN_SUCCESS:
    case ActionTypes.VERIFY_EMAIL_TOKEN_SUCCESS:
      return {
        ...state,
        profile: action.response.auth,
        isFetching: false
      }
    case ActionTypes.SIGNIN_FAILURE:
    case ActionTypes.SIGNUP_FAILURE:
    case ActionTypes.REFRESH_TOKEN_FAILURE:
    case ActionTypes.VERIFY_EMAIL_TOKEN_FAILURE:
      return {
        ...state,
        error: {
          message: action.error.message
        },
        isFetching: false
      }
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case ActionTypes.LOGOUT_NORMAL:
      return {
        ...state,
        profile: initialState.profile,
        isFetching: false
      }
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        status: action.response.status,
        isFetching: false
      }
    default:
      return state
  }
}

export default auth
