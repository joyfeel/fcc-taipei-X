export const SENDING_REQUEST = 'SENDING_REQUEST'
export const sendingRequest = () => {
  return {
    type: SENDING_REQUEST
  }
}

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'
export const signInRequest = (formData) => {
  return {
    type: SIGNIN_REQUEST,
    formData
  }
}
export const signInSuccess = (response) => {
  return {
    type: SIGNIN_SUCCESS,
    response
  }
}
export const signInFailure = (error) => {
  return {
    type: SIGNIN_FAILURE,
    error
  }
}

export const CLEAR_ERROR = 'CLEAR_ERROR'
export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST'
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS'
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE'
export const refreshTokenRequest = () => {
  return {
    type: REFRESH_TOKEN_REQUEST
  }
}
export const refreshTokenSuccess = (response) => {
  return {
    type: REFRESH_TOKEN_SUCCESS,
    response
  }
}
export const refreshTokenFailure = (error) => {
  return {
    type: REFRESH_TOKEN_FAILURE,
    error
  }
}

export const VERIFY_EMAIL_TOKEN_REQUEST = 'VERIFY_EMAIL_TOKEN_REQUEST'
export const VERIFY_EMAIL_TOKEN_SUCCESS = 'VERIFY_EMAIL_TOKEN_SUCCESS'
export const VERIFY_EMAIL_TOKEN_FAILURE = 'VERIFY_EMAIL_TOKEN_FAILURE'
export const verifyEmailTokenRequest = () => {
  return {
    type: VERIFY_EMAIL_TOKEN_REQUEST
  }
}
export const verifyEmailTokenSuccess = (response) => {
  return {
    type: VERIFY_EMAIL_TOKEN_SUCCESS,
    response
  }
}
export const verifyEmailTokenFailure = (error) => {
  return {
    type: VERIFY_EMAIL_TOKEN_FAILURE,
    error
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_NORMAL = 'LOGOUT_NORMAL'
export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  }
}
export const logoutNormal = () => {
  return {
    type: LOGOUT_NORMAL
  }
}
