import { call, put } from 'redux-saga/effects'
import { takeEvery, delay } from 'redux-saga'
import * as SliderActions from '../actions/slider'

const {
  sliderRequest, sliderClose,
} = SliderActions

export default function* sliderFlow(res) {
  yield put(sliderRequest(res))
  yield call(delay, 2000)
  yield put(sliderClose())
}
