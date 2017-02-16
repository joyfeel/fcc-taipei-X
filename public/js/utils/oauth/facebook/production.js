import { v4 } from 'node-uuid'
import qs from 'querystring'

export const facebookConfig = {
  url: '/v1/auth/facebook',
  clientId: process.env.FACEBOOK_ID,
  redirectUri: `${process.env.DEPLOY_SITE}/v1/auth/facebook/callback`,
  authorizationUrl: 'https://www.facebook.com/v2.8/dialog/oauth',
  scope: 'public_profile,email',
  state: v4(),
}

const facebookParams = {
  client_id: facebookConfig.clientId,
  redirect_uri: facebookConfig.redirectUri,
  scope: facebookConfig.scope,
  state: facebookConfig.state,
  response_type: 'code',
}

export const facebookRequestUri = facebookConfig.authorizationUrl + '?' + qs.stringify(facebookParams)
