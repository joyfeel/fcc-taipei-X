export const POPUP_REQUEST = 'POPUP_REQUEST'
export const popupRequest = (res) => {
  return {
    type: POPUP_REQUEST,
    res,
  }
}

export const POPUP_CLOSE = 'POPUP_CLOSE'
export const popupClose = () => {
  return {
    type: POPUP_CLOSE,
  }
}
