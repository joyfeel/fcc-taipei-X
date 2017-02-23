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

export const FIND_NEWER_POST_REQUEST = 'FIND_NEWER_POST_REQUEST'
export const FIND_NEWER_POST_SUCCESS = 'FIND_NEWER_POST_SUCCESS'
export const FIND_NEWER_POST_FAILURE = 'FIND_NEWER_POST_FAILURE'
export const findNewerPostRequest = () => {
  return {
    type: FIND_NEWER_POST_REQUEST,
  }
}
export const findNewerPostSuccess = (response) => {
  return {
    type: FIND_NEWER_POST_SUCCESS,
    response,
  }
}
export const findNewerPostFailure = (error) => {
  return {
    type: FIND_NEWER_POST_FAILURE,
    error,
  }
}

export const DISPLAY_NEWER_POST = 'DISPLAY_NEWER_POST'
export const displayNewerPost = () => {
  return {
    type: DISPLAY_NEWER_POST,
  }
}

export const FIND_OLDER_POST_REQUEST = 'FIND_OLDER_POST_REQUEST'
export const FIND_OLDER_POST_SUCCESS = 'FIND_OLDER_POST_SUCCESS'
export const FIND_OLDER_POST_FAILURE = 'FIND_OLDER_POST_FAILURE'
export const findOlderPostRequest = () => {
  return {
    type: FIND_OLDER_POST_REQUEST,
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

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'
export const deletePostRequest = (post) => {
  return {
    type: DELETE_POST_REQUEST,
    post,
  }
}
export const deletePostSuccess = (response) => {
  return {
    type: DELETE_POST_SUCCESS,
    response,
  }
}
export const deletePostFailure = (error) => {
  return {
    type: DELETE_POST_FAILURE,
    error,
  }
}

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'
export const editPostRequest = (post) => {
  return {
    type: EDIT_POST_REQUEST,
    post,
  }
}
export const editPostSuccess = (response) => {
  return {
    type: EDIT_POST_SUCCESS,
    response,
  }
}
export const editPostFailure = (error) => {
  return {
    type: EDIT_POST_FAILURE,
    error,
  }
}

export const GET_COMMENT_ID_SUCCESS = 'GET_COMMENT_ID_SUCCESS'
export const GET_COMMENT_ID_FAILURE = 'GET_COMMENT_ID_FAILURE'
export const getCommentIdSuccess = (data) => {
  return {
    type: GET_COMMENT_ID_SUCCESS,
    data,
  }
}
export const getCommentIdFailure = (error) => {
  return {
    type: GET_COMMENT_ID_FAILURE,
    error,
  }
}
