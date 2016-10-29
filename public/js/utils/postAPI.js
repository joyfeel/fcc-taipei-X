import auth from './auth'

const fetchBody = (api, form, token) => fetch(api, {
 method: 'post',
 headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`,
 },
 body: JSON.stringify(form)
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const fetchGet = (api) => fetch(api, {
 method: 'get',
 headers: { 'accept': 'application/json' }
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

const postAPI = {
  createPost(post) {
    return fetchBody('http://localhost:3000/v1/posts', post, auth.getToken())
  }
}

export default postAPI
