import { call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as PostActions from '../actions/post'
import * as CombineActions from '../actions/combine'
import postAPI from '../utils/postAPI'
import { getOldestPostID } from '../reducers/selectors'

const {
  createPostSuccess, createPostFailure,
  presentPostSuccess, presentPostFailure,
  findOlderPostSuccess, findOlderPostFailure,
} = PostActions

const {
  sendingRequest, cancelRequest,
} = CombineActions

/************************* CreatePost *************************/
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

/************************* FindPresentPost *************************/
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

/************************* FindOlderPost *************************/
function* findOlderPostFlow() {
  try {
    const postID = yield select(getOldestPostID)
    const response = yield call(postAPI.findOlderPost, postID)
    if (response && response.posts) {
      yield put(findOlderPostSuccess(response))
    }
  } catch(error) {
    yield put(findOlderPostFailure(error))
  }
}
function* findOlderPostFlows() {
  yield put(sendingRequest())
  yield call(findOlderPostFlow)
  yield put(cancelRequest())
}
export function* watchFindOlderPostFlow() {
  yield* takeEvery(PostActions.FIND_OLDER_POST_REQUEST, findOlderPostFlows)
}
