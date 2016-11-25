import { take, call, put, fork } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import qs from 'querystring'
import Boom from 'boom-browserify'
import * as OauthActions from '../actions/oauth'
import * as AuthActions from '../actions/auth'
import * as CombineActions from '../actions/combine'
import auth from '../utils/auth'
import openPopup from '../utils/popup'
import { googleConfig, googleUrl } from '../utils/oauth_config'
import {
  watchCreatePostFlow,
  watchFindNewerPostFlow,
  watchFindOlderPostFlow,
} from './post'

import {
  watchLogoutFlow,
  watchSignUpFlow,
  watchForgetPsFlow,
} from './auth'

import {
  watchSignInFlow,
  watchRefreshFlow,
  watchVerifyEmailTokenFlow,
} from './combine'

const {
  signInSuccess, signInFailure,
} = AuthActions

const {
  sendingRequest, cancelRequest,
} = CombineActions

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
    }
  } catch (error) {
    yield put(signInFailure(error))
  }
  yield put(cancelRequest())
}

function* watchOauthLogin() {
  yield* takeEvery(OauthActions.OAUTH_REQUEST, oauthFlow)
}

export default function* root() {
  yield [
    /* oauth */
    fork(watchOauthLogin),
    /* auth */
    fork(watchLogoutFlow),
    fork(watchSignUpFlow),
    fork(watchForgetPsFlow),
    /* post */
    fork(watchCreatePostFlow),
    fork(watchFindNewerPostFlow),
    fork(watchFindOlderPostFlow),
    /* combine */
    fork(watchSignInFlow),
    fork(watchRefreshFlow),
    fork(watchVerifyEmailTokenFlow),
  ]
}
