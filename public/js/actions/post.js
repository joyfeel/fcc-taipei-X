export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'
export const createPostRequest = (post) => {
  return {
    type: CREATE_POST_REQUEST,
    post,
  }
}
export const createPostSuccess = (response) => {
  return {
    type: CREATE_POST_SUCCESS,
    response,
  }
}
export const createPostFailure = (error) => {
  return {
    type: CREATE_POST_FAILURE,
    error,
  }
}

export const PRESENT_POST_SUCCESS = 'PRESENT_POST_SUCCESS'
export const PRESENT_POST_FAILURE = 'PRESENT_POST_FAILURE'
export const presentPostSuccess = (response) => {
  return {
    type: PRESENT_POST_SUCCESS,
    response,
  }
}
export const presentPostFailure = (error) => {
  return {
    type: PRESENT_POST_FAILURE,
    error,
  }
}

export const FIND_OLDER_POST_REQUEST = 'FIND_OLDER_POST_REQUEST'
export const FIND_OLDER_POST_SUCCESS = 'FIND_OLDER_POST_SUCCESS'
export const FIND_OLDER_POST_FAILURE = 'FIND_OLDER_POST_FAILURE'
export const findOlderPostRequest = (post) => {
  return {
    type: FIND_OLDER_POST_REQUEST,
    post,
  }
}
export const findOlderPostSuccess = (response) => {
  return {
    type: FIND_OLDER_POST_SUCCESS,
    response,
  }
}
export const findOlderPostFailure = (error) => {
  return {
    type: FIND_OLDER_POST_FAILURE,
    error,
  }
}
