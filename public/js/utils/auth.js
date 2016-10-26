import { fetchBody, fetchGet, fetchGetSimple, fetchGetQQ } from './fetch'

const auth = {
  loginFB() {
    //return fetchGet('http://localhost:3000/v1/auth/facebook')
    return fetchGetQQ('http://localhost:3000/v1/auth/facebook')
  },
  login(formData) {
    return fetchBody('http://localhost:3000/v1/signin', formData)
  },
  signup(formData) {
    return fetchBody('http://localhost:3000/v1/signup', formData)
  },
  forgetPS(email) {
    return fetchBody('http://localhost:3000/v1/forgot_password', email)
  },
  verifyAccessToken() {
    const accessToken = auth.getToken()
    return fetchGet(`http://localhost:3000/v1/verifyToken?token=${accessToken}`)
  },
  verifyEmailToken() {
    const emailToken = location.search.split('?token=')[1]
    return fetchGet(`http://localhost:3000/v1/signup?token=${emailToken}`)
  },
  loggedIn() {
    return !!localStorage.token
  },
  logout() {
    localStorage.removeItem('token')
  },
  getToken() {
    try {
      const serializedState = localStorage.getItem('token')
      if (serializedState === null) {
        return undefined
      }
      return JSON.parse(serializedState)
    } catch (err) {
      return undefined
    }
  },
  setToken(token) {
    try {
      const serializedState = JSON.stringify(token);
      localStorage.setItem('token', serializedState);
    } catch (err) {
      // Ignore write errors.
    }
  }
}

export default auth
