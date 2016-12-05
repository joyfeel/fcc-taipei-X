export const SENDING_REQUEST = 'SENDING_REQUEST'
 export const sendingRequest = (fetch) => {
   return {
    type: SENDING_REQUEST,
    fetch,
   }
 }
 export const CANCEL_REQUEST = 'CANCEL_REQUEST'
 export const cancelRequest = (fetch) => {
  return {
    type: CANCEL_REQUEST,
    fetch,
  }
}

export const REFRESH_APP_REQUEST = 'REFRESH_APP_REQUEST'
export const refreshAppRequest = () => {
  return {
    type: REFRESH_APP_REQUEST,
  }
}
