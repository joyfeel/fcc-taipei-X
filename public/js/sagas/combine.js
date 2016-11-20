import { browserHistory } from 'react-router'
import { call, put, fork } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import auth from '../utils/auth'
import postAPI from '../utils/postAPI'
import * as AuthActions from '../actions/auth'
import * as PostActions from '../actions/post'
import * as CombineActions from '../actions/combine'

const {
  refreshTokenSuccess, refreshTokenFailure,
  signInSuccess, signInFailure,
} = AuthActions

const {
  getCurrentPostSuccess, getCurrentPostFailure,
} = PostActions

const {
  sendingRequest, cancelRequest
} = CombineActions

function forwardTo (location) {
  browserHistory.push(location)
}

// function* signInFlow({ formData }) {
//   if (auth.loggedIn()) {
//     return
//   }
//   yield put(sendingRequest())
//   try {
//     const response = yield call(auth.login, formData)
//     if (response && response.auth && response.auth.token) {
//       yield call(auth.setToken, response.auth.token)
//       yield put(signInSuccess(response))
//       forwardTo('/')
//     }
//   } catch (error) {
//     yield put(signInFailure(error))
//   }
//   yield put(cancelRequest())
// }

function* loadSignin(formData) {
  try {
    const response = yield call(auth.login, formData)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(signInSuccess(response))
      forwardTo('/')
    }
  } catch (error) {
    yield put(signInFailure(error))
  }
}

function* loadCurrentPosts() {
  try {
    const response = yield call(postAPI.getCurrentPosts)
    if (response) {
      yield put(getCurrentPostSuccess(response))
    }
  } catch (error) {
    yield put(getCurrentPostFailure(error))
  }
}

function* signInFlow({ formData }) {
  yield put(sendingRequest())
  yield call(loadSignin, formData)
  yield call(loadCurrentPosts)
  yield put(cancelRequest())
}

export function* watchSignInFlow() {
  yield* takeEvery(AuthActions.SIGNIN_REQUEST, signInFlow)
}

function* loadExchangeToken() {
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

function* refreshFlow() {
  yield put(sendingRequest())
  yield call(loadExchangeToken)
  yield call(loadCurrentPosts)
  yield put(cancelRequest())
}

export function* watchRefreshFlow() {
  yield* takeEvery(AuthActions.REFRESH_TOKEN_REQUEST, refreshFlow)
}
