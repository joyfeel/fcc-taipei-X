export const SENDING_REQUEST = 'SENDING_REQUEST'

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
