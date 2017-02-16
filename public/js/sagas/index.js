import { take, call, put, fork, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as CombineActions from '../actions/combine'
import { getPostTimeSocket } from '../reducers/selectors'
import {
  watchCreatePostFlow,
  watchFindNewerPostFlow,
  watchFindOlderPostFlow,
  watchDeletePostFlow,
  watchEditPostFlow,
} from './post'

import {
  watchLogoutFlow,
  watchSignUpFlow,
  watchForgetPsFlow,
} from './auth'

import {
  watchSignInFlow,
  watchOauthSignInFlow,
  watchRefreshFlow,
  watchVerifyEmailTokenFlow,
} from './combine'

function subscribe(socket) {
  return eventChannel(emit => {
    // socket.on('t', ({ time }) => {
    //   emit(addUser({ time }))
    // })
    // socket.on('users.logout', ({ username }) => {
    //   emit(removeUser({ username }));
    // });
    // socket.on('messages.new', ({ message }) => {
    //   emit(newMessage({ message }));
    // });
    // socket.on('disconnect', e => {
    //   // TODO: handle
    // })
    return () => {};
  })
}

function* read(socket) {
  const channel = yield call(subscribe, socket)
  while (true) {
    let action = yield take(channel)
    yield put(action)
  }
}

// function* write(socket) {
//   while (true) {
//     const { payload } = yield take(`${sendMessage}`);
//     socket.emit('message', payload);
//   }
// }

function* handleIO(socket) {
  yield fork(read, socket)
  //yield fork(write, socket);
}
function* lol() {
  const socket = yield select(getPostTimeSocket)
  const task = yield fork(handleIO, socket)
}

export default function* root() {
  yield [
    /* auth */
    fork(watchLogoutFlow),
    fork(watchSignUpFlow),
    fork(watchForgetPsFlow),
    /* post */
    fork(watchCreatePostFlow),
    fork(watchFindNewerPostFlow),
    fork(watchFindOlderPostFlow),
    fork(watchDeletePostFlow),
    fork(watchEditPostFlow),
    /* combine */
    fork(watchSignInFlow),
    fork(watchOauthSignInFlow),
    fork(watchRefreshFlow),
    fork(watchVerifyEmailTokenFlow),
    /* test */
    //fork(lol)
  ]
}
