 export const fetchBody = (api, form) => fetch(api, {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form)
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

export const fetchGet = (api) => fetch(api, {
  method: 'get',
  headers: { 'accept': 'application/json' }
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
