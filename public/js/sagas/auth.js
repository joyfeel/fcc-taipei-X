import { browserHistory } from 'react-router'
import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import auth from '../utils/auth'
import { forwardTo } from '../utils/mixed'
import * as AuthActions from '../actions/auth'
import * as CombineActions from '../actions/combine'

const {
  signInSuccess, signInFailure,
  identityTokenSuccess, identityTokenFailure,
  logoutNormal,
  verifyEmailTokenSuccess, verifyEmailTokenFailure,
  signUpSuccess, signUpFailure,
  forgetPSSuccess, forgetPSFailure,
} = AuthActions

const {
  sendingRequest, cancelRequest,
} = CombineActions

/************************* SignIn *************************/
export function* signInFlow(formData) {
  try {
    const response = yield call(auth.login, formData)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(signInSuccess(response))
      forwardTo('/')
    }
  } catch (error) {
    yield put(signInFailure(error))
    yield call(auth.logout)
  }
}

/************************* IdentifyToken *************************/
export function* identifyTokenFlow() {
  try {
    const response = yield call(auth.verifyAccessToken)
    if (response && response.auth && response.auth.token) {
      yield call(auth.setToken, response.auth.token)
      yield put(identityTokenSuccess(response))
    }
  } catch (error) {
    yield put(identityTokenFailure(error))
    yield call(auth.logout)
  }
}

/************************* Logout *************************/
function* logoutFlows() {
  yield put(sendingRequest())
  yield call(auth.logout)
  yield put(logoutNormal())
  yield put(cancelRequest())
  forwardTo('/signin')
}
export function* watchLogoutFlow() {
  yield* takeEvery(AuthActions.LOGOUT_REQUEST, logoutFlows)
}

/************************* VerifyEmailToken *************************/
export function* verifyEmailTokenFlow() {
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

/************************* SignUp *************************/
function* signUpFlow(formData) {
  try {
    const response = yield call(auth.signup, formData)
    if (response) {
      yield put(signUpSuccess(response))
      forwardTo('/signin')
    }
  } catch(error) {
    yield put(signUpFailure(error))
  }
}
function* signUpFlows({ formData }) {
  yield put(sendingRequest())
  yield call(signUpFlow, formData)
  yield put(cancelRequest())
}
export function* watchSignUpFlow() {
  yield* takeEvery(AuthActions.SIGNUP_REQUEST, signUpFlows)
}

/************************* ForgetPassword *************************/
function* forgetPsFlow({ email }) {
  try {
    const response = yield call(auth.forgetPS, email)
    if (response) {
      yield put(forgetPSSuccess(response))
    }
  } catch(error) {
    yield put(forgetPSFailure(error))
  }
}
function* forgetPsFlows({ email }) {
  yield put(sendingRequest())
  yield call(forgetPsFlow, email)
  yield put(cancelRequest())
}
export function* watchForgetPsFlow() {
  yield* takeEvery(AuthActions.FORGET_PS_REQUEST, forgetPsFlows)
}
