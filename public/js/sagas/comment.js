import { call, put, select } from 'redux-saga/effects'
import { takeEvery, delay } from 'redux-saga'
import * as CommentActions from '../actions/comment'
import * as PostActions from '../actions/post'
import commentAPI from '../utils/commentAPI'

const {
  getCommentRequest, getCommentSuccess, getCommentFailure,
} = CommentActions

const {
  getCommentIdSuccess, getCommentIdFailure,
} = PostActions

/************************* getComment *************************/
export function* getCommentFlow(postData) {
  try {
    const response = yield call(commentAPI.getComment, postData)
    if (response) {
      yield put(getCommentIdSuccess({response, postData}))
      yield put(getCommentSuccess(response))
    }
  } catch(error) {
    yield put(getCommentIdFailure(error))
    yield put(getCommentFailure(error))
  }
}
