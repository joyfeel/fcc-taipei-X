const initialState = {
  token: null,
  user: {}
}

const auth = (state = initialState, action) => {
  console.log(action.auth)
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      // console.log(action.auth.token)
      // console.log(action.auth.user)
      return {
        ...state,
        token: action.auth.token,
        user: action.auth.user
      }
    case 'LOGOUT_SUCCESS':
      return initialState
    case 'LOGIN_ERROR':
      return state
    default:
      return state
  }
}

export default auth
