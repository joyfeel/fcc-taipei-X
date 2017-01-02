import { call, put, select } from 'redux-saga/effects'
import { takeEvery, delay } from 'redux-saga'
import { eventChannel } from 'redux-saga'
import * as PostActions from '../actions/post'
import * as CombineActions from '../actions/combine'
import * as SliderActions from '../actions/slider'
import postAPI from '../utils/postAPI'
import { getOldestPostID, getNewestPostID, getPostTimeSocket } from '../reducers/selectors'
import auth from '../utils/auth'
import sliderFlow from './slider'

const {
  createPostSuccess, createPostFailure,
  presentPostSuccess, presentPostFailure,
  findNewerPostSuccess, findNewerPostFailure,
  findOlderPostSuccess, findOlderPostFailure,
  deletePostRequest, deletePostSuccess, deletePostFailure,
  displayNewerPost,
} = PostActions

const {
  sendingRequest, cancelRequest,
  sendingRequestFindOlderPost, cancelRequestFindOlderPost,
} = CombineActions

const {
  sliderRequest, sliderClose,
} = SliderActions

/************************* CreatePost *************************/
function* createPostFlow(post) {
  try {
    const response = yield call(postAPI.createPost, post)
    if (response) {
      yield put(createPostSuccess(response))
    }
    const socket = yield select(getPostTimeSocket)
    socket.emit('post', {
      token: auth.getToken(),
    })
  } catch(error) {
    yield put(createPostFailure(error))
  }
}
function* createPostFlows({ post }) {
  yield put(sendingRequest())
  yield call(createPostFlow, post)
  yield put(displayNewerPost())
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

/************************* FindNewerPost *************************/
function* findNewerPostFlow() {
  try {
    const postID = yield select(getNewestPostID)
    const response = yield call(postAPI.findNewerPost, postID)
    if (response && response.posts) {
      yield put(findNewerPostSuccess(response))
    }
  } catch (error) {
    yield put(findNewerPostFailure(error))
  }
}
export function* watchFindNewerPostFlow() {
  yield* takeEvery(PostActions.FIND_NEWER_POST_REQUEST, findNewerPostFlow)
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
  yield put(sendingRequestFindOlderPost())
  yield call(findOlderPostFlow)
  yield put(cancelRequestFindOlderPost())
}
export function* watchFindOlderPostFlow() {
  yield* takeEvery(PostActions.FIND_OLDER_POST_REQUEST, findOlderPostFlows)
}

/************************* deletePost *************************/
function* deletePostFlow(post) {
  try {
    const response = yield call(postAPI.deletePost, post)
    if (response) {
      yield put(deletePostSuccess(response))
      yield put(cancelRequest())
      yield sliderFlow(response)
    }
  } catch(error) {
    yield put(deletePostFailure(error))
    yield put(cancelRequest())
    yield sliderFlow(error)
  }
}
function* deletePostFlows({ post }) {
  yield put(sendingRequest())
  yield call(deletePostFlow, post)
}
export function* watchDeletePostFlow() {
  yield* takeEvery(PostActions.DELETE_POST_REQUEST, deletePostFlows)
}
