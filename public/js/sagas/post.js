import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as PostActions from '../actions/post'
import postAPI from '../utils/postAPI'

const {
  sendingPostRequest, cancelPostRequest,
  createPostSuccess, createPostFailure,
} = PostActions

function* createPostFlow({ post }) {
  yield put(sendingPostRequest())
  try {
    const response = yield call(postAPI.createPost, post)
    if (response) {
      yield put(createPostSuccess(response))
    } else {
      yield put(cancelPostRequest())
    }
  } catch(error) {
    yield put(createPostFailure(error))
  }
}

export function* watchCreatePostFlow() {
  yield* takeEvery(PostActions.CREATE_POST_REQUEST, createPostFlow)
}
