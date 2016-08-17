export function loggedIn() {
  console.log(localStorage.token)
  console.log(!localStorage.token)
  console.log(!!localStorage.token)
  return !!localStorage.token
}

function onChange() {
  console.log('..?')
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joybee210@gmail.com' && pass === 'p') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({
        authenticated: false
      })
    }
  }, 0)
}

export function login(email, pass, cb) {
  //console.log(cb)
  //cb = arguments[arguments.length -1]
  if (localStorage.token) {
    if (cb) cb(true)
    onChange(true)
    return
  }

  pretendRequest(email, pass, (res) => {
    if (res.authenticated) {
      localStorage.token = res.token
      if (cb) cb(true)
      onChange(true)
    } else {
      if (cb) cb(false)
      onChange(false)
    }
  })

  //console.log(arguments)
}
