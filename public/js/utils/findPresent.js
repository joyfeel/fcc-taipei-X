export const fetchPresentArticles = (api) => fetch(api, {
  method: 'get',
  headers: { 'accept': 'application/json' }
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
