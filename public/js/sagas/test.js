const API_ENDPOINT = `http://ddddddddddddddd`

export const fetchImages = () => {
  return fetch(API_ENDPOINT).then((response) => {
    return response.json().then((json) => {
      return json.photos.photo.map(

      )
    })
  })
}


import { take, call, put, fork, cancel } from 'redux-saga/effects'

// function* authorize(user, password) {
//   try {
//     const token = yield call(Api.authorize, user, password)
//     yield put({ type: 'LOGIN_SUCCESS' }, token)
//   } catch (error) {
//     yield put({ type: 'LOGIN_ERROR' }, error)
//   }
// }
//
// function* loginFlow() {
//   while(true) {
//     const { user, password } = yield take('LOGIN_REQUEST')
//     const token = yield call(authorize, user, password)
//     if (token) {
//       yield call(Api.storeItem, {token})
//       yield take('LOGOUT')
//       yield call(Api.clearItem, 'token')
//     }
//   }
// }

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({ type: 'LOGIN_SUCCESS' }, token)

    yield call(Api.storeItem, {token})
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR' }, error)
  }
}

function* loginFlow() {
  while(true) {
    const { user, password } = yield take('LOGIN_REQUEST')
    yield fork(authorize, user, password)
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    yield call(Api.clearItem, 'token')    // Supposed to be idempotent
  }
}

//1. 若 authorize 在 user logout 之前成功結束，則 loginFlow saga 會卡在 take logout 那裡
//2. 若 authorize 在 user logout 之前失敗，則失敗會 dispatch LOGIN_ERROR action，會到下一次 loop，又回到並卡在 take('LOGIN_REQUEST')
//3. 若 user 在 authorize 執行完成前觸發 LOGOUT，則會回到並卡在 take('LOGIN_REQUEST')
/*
  但是到此時並不算真得完成，當 user 發出Logout時，我們要想辦法去取消(cancel)掉 authorize process，
  否則的話我們將會有兩個concurrent task併行發展，也會導致 inconsistent state
  Otherwise we'll have 2 concurrent tasks evolving in parallel

  為了可以去 cancel forked task，可以使用 cancel effect
*/

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({ type: 'LOGIN_SUCCESS' }, token)
    yield call(Api.storeItem, {token})
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR' }, error)
  } finally {
    if (yield cancelled()) {
        //.......
    }
  }
}

function* loginFlow() {
  while(true) {
    const { user, password } = yield take('LOGIN_REQUEST')
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT') {
      yield cancel(task)
    }
    yield call(Api.clearItem, 'token')    // Supposed to be idempotent
  }
}




function* bgSync() {
  try {
    while (true) {
      yield put(actions.requestStart())
      const result = yield call()
      yield put(actions.requestSuccess(result))
      yield call(delay, 5000)
    }
  } finally {
    if (yield cancelled()) {
      yield put(actions.requestFailure('Sync cancelled!'))
    }
  }
}


function* main() {
  while(yield take(START_bACKGROUND_SYNC)) {
    const bgSyncTask = yield fork(bgSync)

    yield take(STOP_BACKGROUND_SYNC)
    yield cancel(bgSyncTask)
  }
}
