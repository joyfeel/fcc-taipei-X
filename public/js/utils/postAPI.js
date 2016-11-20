import auth from './auth'

const fetchAuthorizationBody = (api, form, token) => fetch(api, {
 method: 'post',
 headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`,
 },
 body: JSON.stringify(form)
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const fetchAuthorizationGet = (api, token) => fetch(api, {
 method: 'get',
 headers: {
   'Accept': 'application/json',
   'Authorization': `Bearer ${token}`,
 },
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const postAPI = {
  createPost(post) {
    return fetchAuthorizationBody('http://localhost:3000/v1/posts', post, auth.getToken())
  },
  getCurrentPosts() {
    return fetchAuthorizationGet('http://localhost:3000/v1/posts/findPresent', auth.getToken())
  },
}

export default postAPI
