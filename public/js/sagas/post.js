import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as PostActions from '../actions/post'
import * as CombineActions from '../actions/combine'
import postAPI from '../utils/postAPI'

const {
  createPostSuccess, createPostFailure,
} = PostActions

const {
  sendingRequest, cancelRequest
} = CombineActions

function* createPostFlow({ post }) {
  yield put(sendingRequest())
  try {
    const response = yield call(postAPI.createPost, post)
    if (response) {
      yield put(createPostSuccess(response))
    }
    yield put(cancelRequest())
  } catch(error) {
    yield put(createPostFailure(error))
    yield put(cancelRequest())
  }
}

export function* watchCreatePostFlow() {
  yield* takeEvery(PostActions.CREATE_POST_REQUEST, createPostFlow)
}
