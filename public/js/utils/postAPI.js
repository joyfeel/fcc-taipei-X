import auth from './auth'

const fetchAuthorizationBody = (api, form, token) => fetch(api, {
 method: 'post',
 headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`,
 },
 body: JSON.stringify(form)
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const fetchPresentArticles = (api, token) => fetch(api, {
  method: 'get',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const fetchNewerArticles = (api, token) => fetch(api, {
  method: 'get',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const fetchOlderArticles = (api, token) => fetch(api, {
  method: 'get',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const deletePresentArticle = (api, form, token) => fetch(api,{
  method: 'DELETE',
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify(form)

}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const editPresentArticle = (api, form, token) => fetch(api,{
  method: 'PATCH',
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify(form)

}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))


const postAPI = {
  createPost(post) {
    return fetchAuthorizationBody('http://localhost:3000/v1/posts', post, auth.getToken())
  },
  deletePost(post) {
    const { title, content } = post
    return deletePresentArticle(`http://localhost:3000/v1/posts/${post.id}`, { title, content }, auth.getToken())
  },
  editPost(post) {
    const { title, content } = post
    return editPresentArticle(`http://localhost:3000/v1/posts/${post.id}`, { title, content }, auth.getToken())
  },
  findPresentPost() {
    return fetchPresentArticles('http://localhost:3000/v1/posts/findPresent', auth.getToken())
  },
  findNewerPost(postId) {
    return fetchNewerArticles(`http://localhost:3000/v1/posts/findNewer?postID=${postId}`, auth.getToken())
  },
  findOlderPost(postID) {
    return fetchOlderArticles(`http://localhost:3000/v1/posts/findOlder/?postID=${postID}`, auth.getToken())
  },
}

export default postAPI
