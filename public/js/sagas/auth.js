import { browserHistory } from 'react-router'
import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import auth from '../utils/auth'
import * as AuthActions from '../actions/auth'
import * as CombineActions from '../actions/combine'

const {
  signInSuccess, signInFailure,
  logoutNormal,
  refreshTokenSuccess, refreshTokenFailure,
  verifyEmailTokenSuccess, verifyEmailTokenFailure,
  signUpSuccess, signUpFailure,
  forgetPSSuccess, forgetPSFailure
} = AuthActions

const {
  sendingRequest, cancelRequest, refreshRequest
} = CombineActions

function forwardTo (location) {
  browserHistory.push(location)
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
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(signInSuccess(response))
      yield put(refreshRequest())
      forwardTo('/')
    }
  } catch (error) {
    yield put(signInFailure(error))
  }
  yield put(cancelRequest())
}
export function* watchSignInFlow() {
  yield* takeEvery(AuthActions.SIGNIN_REQUEST, signInFlow)
}

function* refreshTokenFlow() {
  if (!auth.loggedIn()) {
    return
  }
  yield put(sendingRequest())
  try {
    const response = yield call(auth.verifyAccessToken)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(refreshTokenSuccess(response))
      yield put(refreshRequest())
    }
  } catch (error) {
    yield put(refreshTokenFailure(error))
    yield call(auth.logout)
  }
  yield put(cancelRequest())
}
export function* watchRefreshTokenFlow() {
  yield* takeEvery(AuthActions.REFRESH_TOKEN_REQUEST, refreshTokenFlow)
}

function* logoutFlow() {
  yield put(sendingRequest())
  yield call(auth.logout)
  yield put(logoutNormal())
  yield put(cancelRequest())
  forwardTo('/')
}
export function* watchLogoutFlow() {
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
      yield put(refreshRequest())
    }
  } catch (error) {
    yield put(verifyEmailTokenFailure(error))
  }
  yield put(cancelRequest())
  forwardTo('/')
}
export function* watchVerifyEmailTokenFlow() {
  yield* takeEvery(AuthActions.VERIFY_EMAIL_TOKEN_REQUEST, verifyEmailTokenFlow)
}

function* signUpFlow({ formData }) {
  yield put(sendingRequest())
  try {
    const response = yield call(auth.signup, formData)
    if (response) {
      yield put(signUpSuccess(response))
      forwardTo('/signin')
      yield put(cancelRequest())
    }
  } catch(error) {
    yield put(signUpFailure(error))
  }
  yield put(cancelRequest())
}
export function* watchSignUpFlow() {
  yield* takeEvery(AuthActions.SIGNUP_REQUEST, signUpFlow)
}

function* forgetPsFlow({ email }) {
  yield put(sendingRequest())
  try {
    const response = yield call(auth.forgetPS, email)
    if (response) {
      yield put(forgetPSSuccess(response))
      yield put(cancelRequest())
    }
  } catch(error) {
    yield put(forgetPSFailure(error))
  }
  yield put(cancelRequest())
}
export function* watchForgetPsFlow() {
  yield* takeEvery(AuthActions.FORGET_PS_REQUEST, forgetPsFlow)
}
