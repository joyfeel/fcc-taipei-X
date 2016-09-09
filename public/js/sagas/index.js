import * as actions from '../actions'
import { take, call, put, fork, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { v4 } from 'node-uuid'
import url from 'url'
import qs from 'querystring'
import Boom from 'boom-browserify'
import { browserHistory } from 'react-router'

const { sendingRequest, signInRequest, signInSuccess, signInFailure } = actions

function oauth2() {
  const config = {
    //post to backend URL
    url: 'http://localhost:3000/v1/auth/google',
    clientId: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
    redirectUri: 'http://localhost:3000/v1/auth/google/callback',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    state: v4(),
    width: 480,
    height: 640
  }
  console.log(config.state)
  const params = {
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope,
    state: config.state,
    //display: 'popup',
    response_type: 'code'
  }

  const url = config.authorizationUrl + '?' + qs.stringify(params)

  return {
    url,
    config
  }
}

//http://front-end.leanote.com/post/%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E7%9A%84%E5%90%84%E7%A7%8D%E9%AB%98%E5%BA%A6%E5%AE%BD%E5%BA%A6
function openPopup(url, config) {
  return new Promise((resolve, reject) => {
    const options = {
            top: window.screenY + ((window.outerHeight - (config.width || 480)) / 2),
            left: window.screenX + ((window.outerWidth - (config.height || 640)) / 2)
          }
    const popup = window.open(url, '_blank', qs.stringify(options, ','))
    //popup.close()
    if (popup && popup.focus) {
      popup.focus()
    }

    resolve({
      window: popup
    })
  })
}

function pollPopup2(window, config, requestToken = undefined) {
  return new Promise((resolve, reject) => {
    const redirectUri = url.parse(config.redirectUri)
    const redirectUriPath = redirectUri.host + redirectUri.pathname
    if (!window || window.closed) {
      clearInterval(polling)
    }
    const popupUrlPath = window.location.host + window.location.pathname
    alert(popupUrlPath)
    alert(redirectUriPath)
    alert(window.location.search)
    if (window.location.search) {
      resolve({
        oauthData: query,
        interval: polling
      })
    }
  })
}

function pollPopup(window, config, requestToken = undefined) {
  return new Promise((resolve, reject) => {
    const redirectUri = url.parse(config.redirectUri)
    const redirectUriPath = redirectUri.host + redirectUri.pathname
    //alert('C')
    const polling = setInterval(() => {
      //alert('D')
      if (!window || window.closed) {
        //alert('E')
        clearInterval(polling)
      }
      //alert('F')
      try {
        //alert('G')
        //console.log(window.location)
        const popupUrlPath = window.location.host + window.location.pathname
        //console.log(popupUrlPath)

        if (popupUrlPath === redirectUriPath) {
          //alert('EE')
          if (window.location.search) {
            const query = qs.parse(window.location.search.substring(1))
            //console.log(query)
            if (query.error) {
              return reject(new Error('query.error ERROR'))
            } else {
              resolve({
                oauthData: query,
                interval: polling
              })
            }
          } else {
            console.log('err1')
            return reject(new Error('window.location.search ERROR'))
          }
        }
      } catch (error) {
        console.log(error)
        //return reject(error)
      }
    }, 500)
  })
}

function exchangeCodeForToken(oauthData, config, window, interval) {
  const data = {
    ...oauthData,
    ...config
  }
  return fetch(config.url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => ({ token: json.token, user: json.user }))
    }

    return response.json()
      .then(json => Boom.create(response.status, json.message))   //get error response from backend
      .then(error => Promise.reject(error))
  }).catch(error => Promise.reject(error))
}

function signIn(token, user) {
  localStorage.token = token
  browserHistory.push('/')
}

function closePopup(window, interval) {
  return new Promise(resolve => {
    clearInterval(interval)
    window.close()
    resolve()
  })
}

const providerStrategy = {
  'google': function* () {
    const { url, config } = yield call(oauth2)
    const { window } = yield call(openPopup, url, config)
    const { oauthData, interval } = yield call(pollPopup, window, config)
    const { token, user } = yield call(exchangeCodeForToken, oauthData, config, window, interval)
    yield call(signIn, token, user)
    yield call(closePopup, window, interval)

    return { token, user }
  },
  'facebook': function* () {
    console.log('FACEBOOK')
  }
}

function* loginThirdParty(action) {
  try {
    const {token, user} = yield call(providerStrategy[action.provider])
    yield put({
      type: 'LOGIN_SUCCESS',
      auth: {
        token,
        user
      }
    })
  } catch (error) {
    //這邊當有錯誤時 可以做 put error action 的動作 (dispatch error action)
    yield put({ type: 'LOGIN_ERROR' })
    console.dir(error)
    console.log('saga err')
  }
}

function* watchThirdPartyLogin() {
  yield* takeEvery('loginThirdParty', loginThirdParty)
}

const fetchBody = (api, form) => fetch(api, {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form)
}).then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

function* signInFlow({ formData }) {
  yield put(sendingRequest())
  try {
    const response = yield call(fetchBody, 'http://localhost:3000/v1/signin', formData)
    yield put(signInSuccess(response))
  } catch (error) {
    yield put(signInFailure(error))
  }
}

function* watchSignInFlow() {
  yield* takeEvery(actions.SIGNIN_REQUEST, signInFlow)
}

export default function* root() {
  yield [
    fork(watchSignInFlow)
    //call(watchThirdPartyLogin)
  ]
}
