import { v4 } from 'node-uuid'
import qs from 'querystring'

export const githubConfig = {
  url: '/v1/auth/github',
  clientId: process.env.GITHUB_ID,
  redirectUri: `${process.env.DEPLOY_SITE}/v1/auth/github/callback`,
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  scope: 'user:email',
  state: v4(),
}

const githubParams = {
  client_id: githubConfig.clientId,
  redirect_uri: githubConfig.redirectUri,
  scope: githubConfig.scope,
  state: githubConfig.state,
  response_type: 'code',
}

export const githubRequestUri = githubConfig.authorizationUrl + '?' + qs.stringify(githubParams)
