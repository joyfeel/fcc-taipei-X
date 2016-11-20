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

export const GET_CURRENT_POST_SUCCESS = 'GET_CURRENT_POST_SUCCESS'
export const GET_CURRENT_POST_FAILURE = 'GET_CURRENT_POST_FAILURE'
export const getCurrentPostSuccess = (response) => {
  return {
    type: GET_CURRENT_POST_SUCCESS,
    response
  }
}
export const getCurrentPostFailure = (error) => {
  return {
    type: GET_CURRENT_POST_FAILURE,
    error
  }
}
