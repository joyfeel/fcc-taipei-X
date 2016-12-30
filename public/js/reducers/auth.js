import * as ActionTypes from '../actions/auth'

const initialState = {
  profile: {
    token: null,
    id: null,
    nickname: null,
    email: null,
    avatar: null,
    edit_nickname_time: null,
    created_time: null,
    updated_time: null,
    create_post_time: null,
  },
}
const auth = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
    case ActionTypes.IDENTIFY_TOKEN_SUCCESS:
    case ActionTypes.VERIFY_EMAIL_TOKEN_SUCCESS:
      return {
        ...state,
        profile: action.response.auth,
      }
    case ActionTypes.SIGNIN_FAILURE:
    case ActionTypes.SIGNUP_FAILURE:
    case ActionTypes.IDENTIFY_TOKEN_FAILURE:
    case ActionTypes.VERIFY_EMAIL_TOKEN_FAILURE:
    case ActionTypes.FORGET_PS_FAILURE:
      return {
        ...state,
      }
    case ActionTypes.SIGNUP_SUCCESS:
    case ActionTypes.FORGET_PS_SUCCESS:
      return {
        ...state,
      }
    case ActionTypes.SOCKET_UPDATE_AUTH_CREATE_POST_TIME:
      return {
        ...state,
        profile: {
          ...state.profile,
          create_post_time: action.create_post_time,
        },
      }
    default:
      return state
  }
}

export default auth
