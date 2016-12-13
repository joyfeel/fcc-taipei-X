import * as ActionTypes from '../actions/popup'
import codeTable from '../utils/apicode'

const initialState = {
  isPopup: false,
  popupMsg: null,
}

const popup = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.POPUP_REQUEST:
      return {
        isPopup: true,
        popupMsg: codeTable(action.res),
      }
    case ActionTypes.POPUP_CLOSE:
      return {
        isPopup: false,
        popupMsg: null,
      }
    default:
      return state
  }
}

export default popup
