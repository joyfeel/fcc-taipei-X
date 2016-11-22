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

export const PRESENT_POST_SUCCESS = 'PRESENT_POST_SUCCESS'
export const PRESENT_POST_FAILURE = 'PRESENT_POST_FAILURE'

export const presentPostSuccess = (response) => {
  return {
    type: PRESENT_POST_SUCCESS,
    response
  }
}
export const presentPostFailure = (error) => {
  return {
    type: PRESENT_POST_FAILURE,
    error
  }
}
