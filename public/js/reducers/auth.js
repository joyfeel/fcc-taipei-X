import { SENDING_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions'

const initialState = {
  isFetching: false,
  profile: {
    uid: null,
    token: null
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
    case SIGNUP_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        isFetching: false
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    // case 'LOGIN_SUCCESS':
    //   // console.log(action.auth.token)
    //   // console.log(action.auth.user)
    //   return {
    //     ...state,
    //     token: action.auth.token,
    //     user: action.auth.user
    //   }
    // case 'LOGOUT_SUCCESS':
    //   return initialState
    // case 'LOGIN_ERROR':
    //   return state
    default:
      return state
  }
}

export default auth
