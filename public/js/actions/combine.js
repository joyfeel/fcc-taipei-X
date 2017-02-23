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

export const POSTFORM_OPEN = 'POSTFORM_OPEN'
export const POSTFORM_CLOSE = 'POSTFORM_CLOSE'
export const postformOpen = () => {
  return {
    type: POSTFORM_OPEN,
  }
}
export const postformClose = () => {
  return {
    type: POSTFORM_CLOSE,
  }
}

export const EDITFORM_OPEN = 'EDITFORM_OPEN'
export const EDITFORM_CLOSE = 'EDITFORM_CLOSE'
export const editformOpen = (post) => {
  return {
    type: EDITFORM_OPEN,
    post,
  }
}
export const editformClose = () => {
  return {
    type: EDITFORM_CLOSE,
  }
}

export const SENDING_COMMENT_REQUEST = 'SENDING_COMMENT_REQUEST'
export const sendingCommentRequest = () => {
  return {
    type: SENDING_COMMENT_REQUEST,
  }
}
export const CANCEL_COMMENT_REQUEST = 'CANCEL_COMMENT_REQUEST'
export const cancelCommentRequest = () => {
  return {
    type: CANCEL_COMMENT_REQUEST,
  }
}
