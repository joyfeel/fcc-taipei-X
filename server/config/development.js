import qs from 'querystring'

const config = {
  port: process.env.PORT || 3000,
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenExpiresIn: '30 days',
    emailTokenExpiresIn: '1 days',
    OAuth2TokenExpiresIn: '1 days',
  },
  /* SMTP & sendgrid*/
  mailServer: {
    gmailSMTP: {
      gmailSender: process.env.GMAIL_USERNAME,
      gmailConfig: {
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
        logger: true,
        debug: true,
      },
    },
    sendgrid: {
      sendgridSender: process.env.SENDGRID_USERNAME,
      apiKey: process.env.SENDGRID_API_KEY,
    },
    mailTemplate: {
      subject: 'Please comfirm your email address',
    },
  },

  dbSchema: {
    user: {
      nicknameChangeTime: `45 days`,
      nicknameChangeLimit: () => {
        return Date.now() + (1000 * 45)
      },
    },
    post: {
      createdPostTime: `2 minutes`,
      createdPostLimit: () => {
        return Date.now() + (1000 * 1.5 * 60)
      },
      loadPostCount() {
        return 10
      },
    },
    comment: {
      defaultCount: 3,
      getMinCommentCount: 3,
      getMaxCommentCount: 10,
    },
  },
  auth: {
    facebook: {
      accessTokenUrl: 'https://graph.facebook.com/v2.8/oauth/access_token',
      profileFields: ['id', 'name', 'email', 'picture'],
      graphApiUrl(access_token) {
        return `https://graph.facebook.com/v2.8/me?${qs.stringify({
          fields: this.profileFields.join(','),
          access_token,
          debug: 'all',
        })}`
      },
      client_id: '714795635361315',
      client_secret: process.env.FACEBOOK_SECRET,
      redirect_uri: 'http://localhost:3000/v1/auth/facebook/callback',
      grant_type: 'authorization_code',
    },
    twitter: {

    },
    google: {
      accessTokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
      peopleApiUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
      client_id: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: 'http://localhost:3000/v1/auth/google/callback',
      grant_type: 'authorization_code',
    },
    github: {
      accessTokenUrl: 'https://github.com/login/oauth/access_token',
      userApiUrl(access_token) {
        return `https://api.github.com/user?${qs.stringify({
          access_token,
        })}`
      },
      client_id: '31b61d31f73d89b7eacc',
      client_secret: process.env.GITHUB_SECRET,
      redirect_uri: 'http://localhost:3000/v1/auth/github/callback',
      grant_type: 'authorization_code',
    },
  },
  hostUrl: 'http://localhost:3000',
  databaseURI: 'mongodb://127.0.0.1:27017/fcc-taipei-x',
  databaseOption: null,
}

export default config
