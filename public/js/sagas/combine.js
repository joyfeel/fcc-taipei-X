import { call, put, fork, take } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { eventChannel } from 'redux-saga'
import postAPI from '../utils/postAPI'
import * as AuthActions from '../actions/auth'
import * as OauthActions from '../actions/oauth'
import * as CombineActions from '../actions/combine'
import * as SocketActions from '../actions/socket'
import { signInFlow, identifyTokenFlow, verifyEmailTokenFlow } from './auth'
import { oauthSignInFlow } from './oauth'
import { findPresentPostFlow } from './post'
import auth from '../utils/auth'
import { connectPostTimeSocket } from '../utils/socket'

const {
  socketUpdateAuthCreatePostTime
} = AuthActions

const {
  sendingRequest, cancelRequest,
} = CombineActions

const {
  createSocketRequest
} = SocketActions

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('postTime', data => {
      const { create_post_time } = data
      emit(socketUpdateAuthCreatePostTime(create_post_time))
    })
    /*
    DEBUG::
    socket.on('disconnect', e => {
      console.log('Disconnected')
    })
    socket.on('reconnecting', e => {
      console.log('Reconnecting')
    })
    socket.on('reconnect', e => {
      console.log('Reconnected')
    })
    */
    return () => {}
  })
}

function* read(socket) {
  const channel = yield call(subscribe, socket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

function* combineOauthSignInFlows({ provider }) {
  yield put(sendingRequest())
  yield call(oauthSignInFlow, provider)
  if (auth.loggedIn()) {
    yield call(findPresentPostFlow)
  }
  yield put(cancelRequest())
}
export function* watchOauthSignInFlow() {
  yield* takeEvery(OauthActions.OAUTH_REQUEST, combineOauthSignInFlows)
}

function* combineSignInFlows({ formData }) {
  yield put(sendingRequest())
  // Send signin request. Then get token and user information from backend
  yield call(signInFlow, formData)
  // Get present 10 posts
  if (auth.loggedIn()) {
    yield call(findPresentPostFlow)
  }
  yield put(cancelRequest())
}
export function* watchSignInFlow() {
  yield* takeEvery(AuthActions.SIGNIN_REQUEST, combineSignInFlows)
}

function* listenSocketEvent() {
  const socket = yield call(connectPostTimeSocket)
  yield put(createSocketRequest(socket))
  const task = yield fork(read, socket)
}

function* combineRefreshFlows() {
  yield put(sendingRequest())
  // Listen to socket
  yield fork(listenSocketEvent)
  // Exchange token (need to identify) for user information
  yield call(identifyTokenFlow)
  // Get present 10 posts
  yield call(findPresentPostFlow)
  yield put(cancelRequest())
}
export function* watchRefreshFlow() {
  yield* takeEvery(CombineActions.REFRESH_APP_REQUEST, combineRefreshFlows)
}

function* verifyEmailTokenFlows() {
  yield put(sendingRequest())
  // Listen to socket
  yield call(verifyEmailTokenFlow)
  if (auth.loggedIn()) {
    yield call(findPresentPostFlow)
  }
  yield put(cancelRequest())
}
export function* watchVerifyEmailTokenFlow() {
  yield* takeEvery(AuthActions.VERIFY_EMAIL_TOKEN_REQUEST, verifyEmailTokenFlows)
}
