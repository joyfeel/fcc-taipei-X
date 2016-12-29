export const SLIDER_REQUEST = 'SLIDER_REQUEST'
export const sliderRequest = (res) => {
  return {
    type: SLIDER_REQUEST,
    res,
  }
}

export const SLIDER_CLOSE = 'SLIDER_CLOSE'
export const sliderClose = () => {
  return {
    type: SLIDER_CLOSE,
  }
}
