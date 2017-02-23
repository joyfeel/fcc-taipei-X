import auth from './auth'

const fetchCommentPost = (api, form, token) => fetch(api, {
 method: 'post',
 headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`,
 },
 body: JSON.stringify(form),
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const fetchGetComments = (api, token) => fetch(api, {
  method: 'get',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))



const commentAPI = {
   commentPost(post, formData) {
      return fetchCommentPost(`/v1/comments/${post.id}`, formData, auth.getToken())
   },
   getComment(postData) {
     const commentLength = postData.comments.length

     //if post.comments state contains comment id, get the last one to call api
     if (commentLength > 0) {
       //The last comment
       const lastComment = postData.comments[commentLength - 1]
       return fetchGetComments(`/v1/comments/${postData.id}?count=3&currentCommentID=${lastComment}`, auth.getToken())
     } else {
       return fetchGetComments(`/v1/comments/${postData.id}?count=3`, auth.getToken())
     }
   }
}

export default commentAPI
