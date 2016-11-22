export const OAUTH_REQUEST = 'OAUTH_REQUEST'
export const oauthRequest = (provider) => {
  return {
    type: OAUTH_REQUEST,
    provider,
  }
}
