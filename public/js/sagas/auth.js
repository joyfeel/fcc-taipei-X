import { browserHistory } from 'react-router'
import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import auth from '../utils/auth'
import * as AuthActions from '../actions/auth'

const {
  sendingAuthRequest, cancelAuthRequest,
  signInSuccess, signInFailure,
  logoutNormal,
  refreshTokenSuccess, refreshTokenFailure,
  verifyEmailTokenSuccess, verifyEmailTokenFailure,
  signUpSuccess, signUpFailure,
  forgetPSSuccess, forgetPSFailure
} = AuthActions

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
  yield put(sendingAuthRequest())
  try {
    const response = yield call(auth.login, formData)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(signInSuccess(response))
      forwardTo('/')
    } else {
      yield put(cancelAuthRequest())
    }
  } catch (error) {
    yield put(signInFailure(error))
  }
}
export function* watchSignInFlow() {
  yield* takeEvery(AuthActions.SIGNIN_REQUEST, signInFlow)
}

function* refreshFlow() {
  if (!auth.loggedIn()) {
    return
  }
  yield put(sendingAuthRequest())
  try {
    const response = yield call(auth.verifyAccessToken)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(refreshTokenSuccess(response))
    } else {
      yield put(cancelAuthRequest())
    }
  } catch (error) {
    yield put(refreshTokenFailure(error))
    yield call(auth.logout)
  }
}
export function* watchRefreshFlow() {
  yield* takeEvery(AuthActions.REFRESH_TOKEN_REQUEST, refreshFlow)
}

function* logoutFlow() {
  yield put(sendingAuthRequest())
  yield call(auth.logout)
  yield put(logoutNormal())
  forwardTo('/')
}
export function* watchLogoutFlow() {
  yield* takeEvery(AuthActions.LOGOUT_REQUEST, logoutFlow)
}

function* verifyEmailTokenFlow() {
  yield put(sendingAuthRequest())
  if (auth.loggedIn()) {
    yield call(auth.logout)
  }
  try {
    const response = yield call(auth.verifyEmailToken)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(verifyEmailTokenSuccess(response))
    } else {
      yield put(cancelAuthRequest())
    }
  } catch (error) {
    yield put(verifyEmailTokenFailure(error))
  }
  forwardTo('/')
}
export function* watchVerifyEmailTokenFlow() {
  yield* takeEvery(AuthActions.VERIFY_EMAIL_TOKEN_REQUEST, verifyEmailTokenFlow)
}

function* signUpFlow({ formData }) {
  yield put(sendingAuthRequest())
  try {
    const response = yield call(auth.signup, formData)
    if (response) {
      yield put(signUpSuccess(response))
      forwardTo('/signin')
    } else {
      yield put(cancelAuthRequest())
    }
  } catch(error) {
    yield put(signUpFailure(error))
  }
}
export function* watchSignUpFlow() {
  yield* takeEvery(AuthActions.SIGNUP_REQUEST, signUpFlow)
}

function* forgetPsFlow({ email }) {
  yield put(sendingAuthRequest())
  try {
    const response = yield call(auth.forgetPS, email)
    if (response) {
      yield put(forgetPSSuccess(response))
    } else {
      yield put(cancelAuthRequest())
    }
  } catch(error) {
    yield put(forgetPSFailure(error))
  }
}
export function* watchForgetPsFlow() {
  yield* takeEvery(AuthActions.FORGET_PS_REQUEST, forgetPsFlow)
}
