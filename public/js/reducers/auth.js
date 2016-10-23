import * as ActionTypes from '../actions/auth'
import codeTable from '../utils/apicode'

const initialState = {
  isFetching: false,
  isPopup: false,
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
  popupMsg: null
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
        isFetching: false,
        isPopup: true,
        popupMsg: codeTable(action.error)
      }
    case ActionTypes.CLEAR_POPUPMSG:
      return {
        ...state,
        isPopup: false,
        popupMsg: null
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
        isFetching: false,
        isPopup: true,
        popupMsg: codeTable(action.response)
      }
    default:
      return state
  }
}

export default auth
