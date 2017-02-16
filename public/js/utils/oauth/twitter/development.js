import { v4 } from 'node-uuid'
import qs from 'querystring'
//https://dev.twitter.com/web/sign-in/implementing
export const twitterConfig = {
  url: 'http://127.0.0.1:3000/v1/auth/twitter',
  //clientId: 'SBUdNkTyybaSKnzReXPnGEFMh',
  redirectUri: 'http://127.0.0.1:3000/v1/auth/twitter/callback',
  authorizationUrl: 'https://api.twitter.com/oauth/authenticate',
  //scope: '',
  //state: v4(),
}

const twitterParams = {
  client_id: twitterConfig.clientId,
  redirect_uri: twitterConfig.redirectUri,
  //scope: twitterConfig.scope,
  //state: twitterConfig.state,
  //display: 'popup',
  //response_type: 'code'
}

export const twitterRequestUri = twitterConfig.authorizationUrl + '?' + qs.stringify(twitterParams)
