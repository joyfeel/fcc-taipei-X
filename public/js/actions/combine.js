export const SENDING_REQUEST = 'SENDING_REQUEST'
 export const sendingRequest = () => {
   return {
    type: SENDING_REQUEST,
   }
 }
 export const CANCEL_REQUEST = 'CANCEL_REQUEST'
 export const cancelRequest = () => {
  return {
    type: CANCEL_REQUEST,
  }
}

export const REFRESH_APP_REQUEST = 'REFRESH_APP_REQUEST'
export const REFRESH_APP_SUCCESS = 'REFRESH_APP_SUCCESS'
export const REFRESH_APP_FAILURE = 'REFRESH_APP_FAILURE'
export const refreshAppRequest = () => {
  return {
    type: REFRESH_APP_REQUEST,
  }
}
export const refreshAppSuccess = (response) => {
  return {
    type: REFRESH_APP_SUCCESS,
    response,
  }
}
export const refreshAppFailure = (error) => {
  return {
    type: REFRESH_APP_FAILURE,
    error,
  }
}
