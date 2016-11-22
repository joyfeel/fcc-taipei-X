import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as PostActions from '../actions/post'
import * as CombineActions from '../actions/combine'
import postAPI from '../utils/postAPI'

const {
  createPostSuccess, createPostFailure,
  presentPostSuccess, presentPostFailure,
} = PostActions

const {
  sendingRequest, cancelRequest
} = CombineActions

function* createPostFlow(post) {
  try {
    const response = yield call(postAPI.createPost, post)
    if (response) {
      yield put(createPostSuccess(response))
    }
  } catch(error) {
    yield put(createPostFailure(error))
  }
}

function* createPostFlows({ post }) {
  yield put(sendingRequest())
  yield call(createPostFlow, post)
  yield put(cancelRequest())
}

export function* watchCreatePostFlow() {
  yield* takeEvery(PostActions.CREATE_POST_REQUEST, createPostFlows)
}

export function* findPresentPostFlow() {
  try {
    const response = yield call(postAPI.findPresentPost)
    if (response && response.posts) {
      yield put(presentPostSuccess(response))
    }
  } catch (error) {
    yield put(presentPostFailure(error))
  }
}
