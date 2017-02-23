export const GET_COMMENT_REQUEST = 'GET_COMMENT_REQUEST'
export const getCommentRequest = (postData) => {
   return {
    type: GET_COMMENT_REQUEST,
    postData,
   }
 }
 export const CANCEL_GET_COMMENT_REQUEST = 'CANCEL_GET_COMMENT_REQUEST'
 export const cancelGetCommentRequest = () => {
  return {
    type: CANCEL_GET_COMMENT_REQUEST,
  }
}

export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS'
export const getCommentSuccess = (response) => {
   return {
    type: GET_COMMENT_SUCCESS,
    response,
   }
}
export const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE'
export const getCommentFailure = (error) => {
   return {
    type: GET_COMMENT_FAILURE,
    error,
   }
}

export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST'
export const postCommentRequest = (postId, content) => {
   return {
    type: POST_COMMENT_REQUEST,
    postId,
    content,
   }
 }
 export const CANCEL_POST_COMMENT_REQUEST = 'CANCEL_POST_COMMENT_REQUEST'
 export const cancelPostCommentRequest = () => {
  return {
    type: CANCEL_POST_COMMENT_REQUEST,
  }
}
