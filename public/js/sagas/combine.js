import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import postAPI from '../utils/postAPI'
import * as AuthActions from '../actions/auth'
import * as PostActions from '../actions/post'
import * as CombineActions from '../actions/combine'
import { signInFlow, identifyTokenFlow } from './auth'
import { findPresentPostFlow } from './post'

const {
  sendingRequest, cancelRequest,
} = CombineActions

function* combineSignInFlows({ formData }) {
  yield put(sendingRequest())
  // Send signin request. Then get token and user information from backend
  yield call(signInFlow, formData)
  // Get present 10 posts
  yield call(findPresentPostFlow)
  yield put(cancelRequest())
}

export function* watchSignInFlow() {
  yield* takeEvery(AuthActions.SIGNIN_REQUEST, combineSignInFlows)
}

function* combineRefreshFlows() {
  yield put(sendingRequest())
  // Exchange token (need to identify) for user information
  yield call(identifyTokenFlow)
  // Get present 10 posts
  yield call(findPresentPostFlow)
  yield put(cancelRequest())
}

export function* watchRefreshFlow() {
  yield* takeEvery(CombineActions.REFRESH_APP_REQUEST, combineRefreshFlows)
}
