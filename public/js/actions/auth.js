export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'
export const signInRequest = (formData) => {
  return {
    type: SIGNIN_REQUEST,
    formData,
  }
}
export const signInSuccess = (response) => {
  return {
    type: SIGNIN_SUCCESS,
    response,
  }
}
export const signInFailure = (error) => {
  return {
    type: SIGNIN_FAILURE,
    error,
  }
}

export const CLEAR_POPUPMSG = 'CLEAR_POPUPMSG'
export const clearPopupMsg = () => {
  return {
    type: CLEAR_POPUPMSG,
  }
}

export const IDENTIFY_TOKEN_REQUEST = 'IDENTIFY_TOKEN_REQUEST'
export const IDENTIFY_TOKEN_SUCCESS = 'IDENTIFY_TOKEN_SUCCESS'
export const IDENTIFY_TOKEN_FAILURE = 'IDENTIFY_TOKEN_FAILURE'
export const identityTokenRequest = () => {
  return {
    type: IDENTIFY_TOKEN_REQUEST,
  }
}
export const identityTokenSuccess = (response) => {
  return {
    type: IDENTIFY_TOKEN_SUCCESS,
    response,
  }
}
export const identityTokenFailure = (error) => {
  return {
    type: IDENTIFY_TOKEN_FAILURE,
    error,
  }
}

export const VERIFY_EMAIL_TOKEN_REQUEST = 'VERIFY_EMAIL_TOKEN_REQUEST'
export const VERIFY_EMAIL_TOKEN_SUCCESS = 'VERIFY_EMAIL_TOKEN_SUCCESS'
export const VERIFY_EMAIL_TOKEN_FAILURE = 'VERIFY_EMAIL_TOKEN_FAILURE'
export const verifyEmailTokenRequest = () => {
  return {
    type: VERIFY_EMAIL_TOKEN_REQUEST,
  }
}
export const verifyEmailTokenSuccess = (response) => {
  return {
    type: VERIFY_EMAIL_TOKEN_SUCCESS,
    response,
  }
}
export const verifyEmailTokenFailure = (error) => {
  return {
    type: VERIFY_EMAIL_TOKEN_FAILURE,
    error,
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_NORMAL = 'LOGOUT_NORMAL'
export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  }
}
export const logoutNormal = () => {
  return {
    type: LOGOUT_NORMAL,
  }
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const signUpRequest = (formData) => {
  return {
    type: SIGNUP_REQUEST,
    formData,
  }
}
export const signUpSuccess = (response) => {
  return {
    type: SIGNUP_SUCCESS,
    response,
  }
}
export const signUpFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    error,
  }
}
export const FORGET_PS_POPUP = 'FORGET_PS_POPUP'
export const forgetPSPopup = () => {
  return {
    type: FORGET_PS_POPUP,
    code: 100001,
  }
}

export const FORGET_PS_REQUEST = 'FORGET_PS_REQUEST'
export const FORGET_PS_SUCCESS = 'FORGET_PS_SUCCESS'
export const FORGET_PS_FAILURE = 'FORGET_PS_FAILURE'
export const forgetPSRequest = (email) => {
  return {
    type: FORGET_PS_REQUEST,
    email,
  }
}
export const forgetPSSuccess = (response) => {
  return {
    type: FORGET_PS_SUCCESS,
    response,
  }
}
export const forgetPSFailure = (error) => {
  return {
    type: FORGET_PS_FAILURE,
    error,
  }
}

/* Socket */
export const SOCKET_UPDATE_AUTH_CREATE_POST_TIME = 'SOCKET_UPDATE_AUTH_CREATE_POST_TIME'
export const socketUpdateAuthCreatePostTime = (create_post_time) => {
  return {
    type: SOCKET_UPDATE_AUTH_CREATE_POST_TIME,
    create_post_time,
  }
}
