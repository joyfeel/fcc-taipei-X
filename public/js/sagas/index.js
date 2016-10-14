import { take, call, put, fork, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { v4 } from 'node-uuid'
import url from 'url'
import qs from 'querystring'
import Boom from 'boom-browserify'
import { browserHistory } from 'react-router'
import * as AuthActions from '../actions/auth'
import * as OauthActions from '../actions/oauth'
import auth from '../utils/auth'
import openPopup from '../utils/popup'
import { googleConfig, googleUrl } from '../utils/oauth_config'

const {
  sendingRequest, cancelRequest,
  signInRequest, signInSuccess, signInFailure,
  logoutRequest, logoutNormal,
  refreshTokenRequest, refreshTokenSuccess, refreshTokenFailure,
  verifyEmailTokenRequest, verifyEmailTokenSuccess, verifyEmailTokenFailure } = AuthActions

function forwardTo (location) {
  browserHistory.push(location)
}

const pollingPopup = (popWin) => {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      try {
        if (!popWin.location.search) {
          clearInterval(intervalId)
          resolve(null)
        }
        const query = popWin.location.search.substring(1)
        const parsedQuery = qs.parse(query)
        if (parsedQuery.code) {
          clearInterval(intervalId)
          popWin.close()
          resolve(parsedQuery.code)
        }
      } catch (e) {
      }
    }, 1000)
  })
}

function exchangeCodeForToken(code) {
  return fetch(googleConfig.url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => json)
    }

    return response.json()
      .then(json => Boom.create(response.status, json.message))   //get error response from backend
      .then(error => Promise.reject(error))
  }).catch(error => Promise.reject(error))
}

const providerStrategy = {
  'google': function* () {
    const popup = yield call(openPopup, googleUrl, '_blank', 'google')
    const code = yield call(pollingPopup, popup)
    if (code) {
      return yield call(exchangeCodeForToken, code)
    } else {
      return null
    }
  }
}

function* oauthFlow({ provider }) {
  yield put(sendingRequest())
  try {
    const response = yield call(providerStrategy[provider])
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(signInSuccess(response))
    } else {
      yield put(cancelRequest())
    }
  } catch (error) {
    yield put(signInFailure(error))
  }
}

function* watchOauthLogin() {
  yield* takeEvery(OauthActions.OAUTH_REQUEST, oauthFlow)
}

/**************************************************************************/
/******************************* Auth *************************************/
/**************************************************************************/
function* signInFlow({ formData }) {
  if (auth.loggedIn()) {
    return
  }
  yield put(sendingRequest())
  try {
    const response = yield call(auth.login, formData)
    console.log(response)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(signInSuccess(response))
    }
  } catch (error) {
    yield put(signInFailure(error))
  }
}
function* watchSignInFlow() {
  yield* takeEvery(AuthActions.SIGNIN_REQUEST, signInFlow)
}

function* refreshFlow() {
  if (!auth.loggedIn()) {
    return
  }
  yield put(sendingRequest())
  try {
    const response = yield call(auth.verifyAccessToken)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(refreshTokenSuccess(response))
    }
  } catch (error) {
    yield put(refreshTokenFailure(error))
    yield call(auth.logout)
  }
}
function* watchRefreshFlow() {
  yield* takeEvery(AuthActions.REFRESH_TOKEN_REQUEST, refreshFlow)
}

function* logoutFlow() {
  yield put(sendingRequest())
  yield call(auth.logout)
  yield put(logoutNormal())
  forwardTo('/')
}
function* watchLogoutFlow() {
  yield* takeEvery(AuthActions.LOGOUT_REQUEST, logoutFlow)
}

function* verifyEmailTokenFlow() {
  yield put(sendingRequest())
  if (auth.loggedIn()) {
    yield call(auth.logout)
  }
  try {
    const response = yield call(auth.verifyEmailToken)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(verifyEmailTokenSuccess(response))
    }
  } catch (error) {
    yield put(verifyEmailTokenFailure(error))
  }
  forwardTo('/')
}
function* watchVerifyEmailTokenFlow() {
  yield* takeEvery(AuthActions.VERIFY_EMAIL_TOKEN_REQUEST, verifyEmailTokenFlow)
}

export default function* root() {
  yield [
    fork(watchOauthLogin),
    fork(watchSignInFlow),
    fork(watchRefreshFlow),
    fork(watchLogoutFlow),
    fork(watchVerifyEmailTokenFlow)
  ]
}
