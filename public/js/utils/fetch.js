 export const fetchBody = (api, form) => fetch(api, {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form)
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

export const fetchGet = (api) => fetch(api, {
  method: 'get',
  headers: { 'accept': 'application/json' }
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

export const fetchGetSimple = (api) => fetch(api, {
  //method: 'get',
  headers: { 'accept': 'application/json' },
  mode: 'no-cors',
  //credentials : 'include'
}).then(res => res.ok ? res.text().then(text => {console.log(text)}): res.text().then(err => Promise.reject(err)))
//"Content-Type" : "text/plain"
export const fetchGetQQ = (api) => fetch(api, {
  //method: 'get',
  headers: { "Content-Type" : "text/plain"  },
  mode: 'no-cors',
  //credentials : 'include'
}).then(res => {
  console.log(res)
  return res.json()
}).then(json => {
  console.log(json)
})

/*
res.ok ? res.json().then(json => {
  console.log('@@')
  console.log(json)
}): res.json().then(err => {
  console.log('GGG')
  Promise.reject(err)
}))
*/

// { credentials : 'same-origin' })
