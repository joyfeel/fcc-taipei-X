import { v4 } from 'node-uuid'
import qs from 'querystring'

export const facebookConfig = {
  url: `${process.env.DEPLOY_SITE}/v1/auth/facebook`,
  clientId: '714795635361315',
  redirectUri: `${process.env.DEPLOY_SITE}/v1/auth/facebook/callback`,
  authorizationUrl: 'https://www.facebook.com/v2.8/dialog/oauth',
  scope: 'public_profile,email',
  //應用程式為了避免跨網站偽造要求所建立的隨意唯一字串。
  state: v4(),
}

const facebookParams = {
  client_id: facebookConfig.clientId,
  redirect_uri: facebookConfig.redirectUri,
  scope: facebookConfig.scope,
  state: facebookConfig.state,
  //display: 'popup',
  response_type: 'code'
}

export const facebookRequestUri = facebookConfig.authorizationUrl + '?' + qs.stringify(facebookParams)
