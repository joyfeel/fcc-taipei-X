import { take, call, put, fork, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
//import { googleLogin } from '../actions/oauth'
import { v4 } from 'node-uuid'
import url from 'url'
import qs from 'querystring'

function oauth2() {
  const config = {
    //post to backend URL
    url: 'http://localhost:3000/v1/auth/google',
    clientId: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
    redirectUri: 'http://localhost:3000/v1/auth/google/callback',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    state: v4(),
    width: 480,
    height: 640
  }
  console.log(config.state)
  const params = {
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope,
    state: config.state,
    display: 'popup',
    response_type: 'code'
  }

  const url = config.authorizationUrl + '?' + qs.stringify(params)

  return {
    url,
    config
  }
}

//http://front-end.leanote.com/post/%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E7%9A%84%E5%90%84%E7%A7%8D%E9%AB%98%E5%BA%A6%E5%AE%BD%E5%BA%A6
function openPopup(url, config) {
  return new Promise((resolve, reject) => {
    const options = {
            top: window.screenY + ((window.outerHeight - (config.width || 480)) / 2),
            left: window.screenX + ((window.outerWidth - (config.height || 640)) / 2)
          }
    const popup = window.open(url, '_blank', qs.stringify(options, ','))
    resolve({
      window: popup
    })
  })
}

function pollPopup(window, config, requestToken = undefined) {
  return new Promise((resolve, reject) => {
    const redirectUri = url.parse(config.redirectUri)
    const redirectUriPath = redirectUri.host + redirectUri.pathname

    const polling = setInterval(() => {
      if (!window || window.closed) {
        clearInterval(polling)
      }
      try {
        const popupUrlPath = window.location.host + window.location.pathname
        if (popupUrlPath === redirectUriPath) {
          if (window.location.search) {
            const query = qs.parse(window.location.search.substring(1))
            resolve({
              oauthData: query,
              interval: polling
            })
          }
        }
      } catch (error) {
        reject({
          error
        })
        clearInterval(polling)
      }
    }, 500)
  })
}

function exchangeCodeForToken(oauthData, config, window, interval) {
  const data = {
    ...oauthData,
    ...config
  }

  return fetch(config.url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return ({
          token: json.token,
          user: json.user
        })
      })
    }
  })
}

const providerStrategy = {
  'google': function* () {
    console.log('GOOGLE!!!')
    const { url, config } = oauth2()
    const { window } = yield call(openPopup, url, config)
    const { oauthData, interval } = yield call(pollPopup, window, config)
    const { token, user } = yield call(exchangeCodeForToken, oauthData, config, window, interval)
    //yield put({ type: 'OAUTH_SUCCESS' })
  },
  'facebook': function* () {
    console.log('FACEBOOK')
  }
}

function* loginThirdParty(action) {
  try {
    yield call(providerStrategy[action.provider])
  } catch (error) {
    //這邊當有錯誤時 可以做 put error action 的動作 (dispatch error action)
    //yield put({ type: 'OAUTH_FAILURE' })
    console.log('saga err')
  }

  /*
  try {
    //action.provider
    const { url, config } = yield call(oauth2)
    const { window } = yield call(openPopup, url, config)
    const { oauthData, interval} = yield call(pollPopup, window, config)
    const { token, user } = yield call(exchangeCodeForToken, oauthData, config, window, interval)

  } catch(e) {
    console.log('saga err')
  }
  */
}

function* watchThirdPartyLogin() {
  yield* takeEvery('loginThirdParty', loginThirdParty)
}

export default function* root() {
  yield [
    call(watchThirdPartyLogin)
    //fork(takeEvery, 'google', google)
    //fork(takeEvery, 'OAUTH_SUCCESS', sb)
    //fork(test)
  ]
}
