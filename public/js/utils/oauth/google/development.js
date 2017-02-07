import { v4 } from 'node-uuid'
import qs from 'querystring'

export const googleConfig = {
  url: 'http://localhost:3000/v1/auth/google',
  clientId: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
  redirectUri: 'http://localhost:3000/v1/auth/google/callback',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  state: v4(),
}

const googleParams = {
  client_id: googleConfig.clientId,
  redirect_uri: googleConfig.redirectUri,
  scope: googleConfig.scope,
  state: googleConfig.state,
  //display: 'popup',
  response_type: 'code'
}

export const googleRequestUri = googleConfig.authorizationUrl + '?' + qs.stringify(googleParams)


// export const googleConfig = {
//   url: 'http://localhost:3000/v1/auth/google',
//   clientId: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
//   redirectUri: 'http://localhost:3000/v1/auth/google/callback',
//   authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
//   scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
//   state: v4()
// }
//
// const googleParams = {
//   client_id: googleConfig.clientId,
//   redirect_uri: googleConfig.redirectUri,
//   scope: googleConfig.scope,
//   state: googleConfig.state,
//   //display: 'popup',
//   response_type: 'code'
// }
//
// export const googleRequestUri = googleConfig.authorizationUrl + '?' + qs.stringify(googleParams)
