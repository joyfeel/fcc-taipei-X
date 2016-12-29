import * as ActionTypes from '../actions/slider'
import codeTable from '../utils/apicode'

const initialState = {
  isSlider: false,
  sliderMsg: null,
}

const slider = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.SLIDER_REQUEST:
      return {
        isSlider: true,
        sliderMsg: codeTable(action.res),
      }
    case ActionTypes.SLIDER_CLOSE:
      return {
        isSlider: false,
        sliderMsg: null,
      }
    default:
      return state
  }
}

export default slider
