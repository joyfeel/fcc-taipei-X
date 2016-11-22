import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import auth from '../utils/auth'
import postAPI from '../utils/postAPI'
import * as AuthActions from '../actions/auth'
import * as PostActions from '../actions/post'
import * as CombineActions from '../actions/combine'

const {
  sendingAuthRequest, cancelAuthRequest,
  signInSuccess, signInFailure,
  logoutNormal,
  refreshTokenSuccess, refreshTokenFailure,
  verifyEmailTokenSuccess, verifyEmailTokenFailure,
  signUpSuccess, signUpFailure,
  forgetPSSuccess, forgetPSFailure
} = AuthActions

const {
  presentPostSuccess,
  presentPostFailure,
   } = PostActions

const {
  sendingRequest,
  refreshRequest,
  refreshSuccess,
  refreshFailure,
  cancelRequest, } = CombineActions


function* refreshFlow() {
  yield put(sendingRequest())
  try {
    if (localStorage.token) {
      const post = yield call(postAPI.findPresentPost)
      yield put(presentPostSuccess(post))
    } else {
      yield put(cancelRequest())
    }
  } catch (error) {
    yield put(presentPostFailure(error))
  }
}
export function* watchRefreshFlow() {
  yield* takeEvery(CombineActions.REFRESH_REQUEST, refreshFlow)
}
