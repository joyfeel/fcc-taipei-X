export const REFRESH_REQUEST = 'REFRESH_REQUEST'
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS'
export const REFRESH_FAILURE = 'REFRESH_FAILURE'
export const refreshRequest = () => {
  return {
    type: REFRESH_REQUEST,
  }
}
export const refreshSuccess = (response) => {
  return {
    type: REFRESH_SUCCESS,
    response,
  }
}
export const refreshFailure = (error) => {
  return {
    type: REFRESH_FAILURE,
    error,
  }
}




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
