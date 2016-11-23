import { browserHistory } from 'react-router'

export function forwardTo (location) {
  browserHistory.push(location)
}

// Ref. http://harttle.com/2016/04/24/client-height-width.html
function getInnerHeight() {
  return window['innerHeight'] || document.documentElement['clientHeight'] || document.body['clientHeight']
}

// Ref: https://github.com/zcoding/without-jQuery/blob/master/document/scroll.md
function getScrollTop() {
  return window['pageYOffset'] || document.documentElement['scrollTop'] || document.body['scrollTop'] || 0
}

function getOffsetHeight() {
  return document.documentElement['scrollHeight'] || document.body['offsetHeight']
}

export function scrollBottomListener(cb) {
  if ((getInnerHeight() + getScrollTop()) >= getOffsetHeight()) {
    cb()
  }
}
