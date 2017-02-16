import { v4 } from 'node-uuid'
import qs from 'querystring'

export const googleConfig = {
  url: '/v1/auth/google',
  clientId: process.env.GOOGLE_ID,
  redirectUri: `${process.env.DEPLOY_SITE}/v1/auth/google/callback`,
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  state: v4(),
}

const googleParams = {
  client_id: googleConfig.clientId,
  redirect_uri: googleConfig.redirectUri,
  scope: googleConfig.scope,
  state: googleConfig.state,
  response_type: 'code',
}

export const googleRequestUri = googleConfig.authorizationUrl + '?' + qs.stringify(googleParams)
