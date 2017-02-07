import { call, put } from 'redux-saga/effects'
import qs from 'querystring'
import Boom from 'boom-browserify'
import * as AuthActions from '../actions/auth'
import * as PopupActions from '../actions/popup'
import auth from '../utils/auth'
import openPopup from '../utils/popup'
import { forwardTo } from '../utils/mixed'
import { googleConfig, googleRequestUri } from '../utils/oauth/google'
import { facebookConfig, facebookRequestUri } from '../utils/oauth/facebook'

const {
  signInSuccess, signInFailure,
} = AuthActions

const {
  popupRequest,
} = PopupActions

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

function exchangeCodeForToken(url, code) {
  return fetch(url, {
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
    const popup = yield call(openPopup, googleRequestUri, '_blank', 'google')
    const code = yield call(pollingPopup, popup)
    if (code) {
      return yield call(exchangeCodeForToken, googleConfig.url, code)
    } else {
      return null
    }
  },
  'facebook': function* () {
    const popup = yield call(openPopup, facebookRequestUri, '_blank', 'facebook')
    const code = yield call(pollingPopup, popup)
    if (code) {
      return yield call(exchangeCodeForToken, facebookConfig.url, code)
    } else {
      return null
    }
  }
}

/************************* OAuthSignIn *************************/
export function* oauthSignInFlow(provider) {
  try {
    const response = yield call(providerStrategy[provider])
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(signInSuccess(response))
      yield forwardTo('/')
    }
  } catch (error) {
    yield put(signInFailure())
    yield call(auth.logout)
    yield put(popupRequest(error))
  }
}
