export const SENDING_POST_REQUEST = 'SENDING_POST_REQUEST'
export const sendingPostRequest = () => {
  return {
    type: SENDING_POST_REQUEST
  }
}
export const CANCEL_POST_REQUEST = 'CANCEL_POST_REQUEST'
export const cancelPostRequest = () => {
  return {
    type: CANCEL_POST_REQUEST
  }
}

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'
export const createPostRequest = (post) => {
  return {
    type: CREATE_POST_REQUEST,
    post
  }
}
export const createPostSuccess = (response) => {
  return {
    type: CREATE_POST_SUCCESS,
    response
  }
}
export const createPostFailure = (error) => {
  return {
    type: CREATE_POST_FAILURE,
    error
  }
}
