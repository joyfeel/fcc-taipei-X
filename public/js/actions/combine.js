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

export const SENDING_REQUEST_FIND_OLDER_POST = 'SENDING_REQUEST_FIND_OLDER_POST'
 export const sendingRequestFindOlderPost = () => {
   return {
    type: SENDING_REQUEST_FIND_OLDER_POST,
   }
 }
 export const CANCEL_REQUEST_FIND_OLDER_POST = 'CANCEL_REQUEST_FIND_OLDER_POST'
 export const cancelRequestFindOlderPost = () => {
  return {
    type: CANCEL_REQUEST_FIND_OLDER_POST,
  }
}

export const REFRESH_APP_REQUEST = 'REFRESH_APP_REQUEST'
export const refreshAppRequest = () => {
  return {
    type: REFRESH_APP_REQUEST,
  }
}
