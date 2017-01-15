export default {
  hostUrl: process.env.NODE_ENV === 'production' ? process.env.DEPLOY_SITE : 'http://localhost:3000',
}
