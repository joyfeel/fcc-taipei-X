const config = {
  port: process.env.PORT || 3000,
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenExpiresIn: '30 days',
    emailTokenExpiresIn: '1 days',
    OAuth2TokenExpiresIn: '1 days',
  },
  /* SMTP & Sendgrid */
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
    google: {
      accessTokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
      peopleApiUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
      client_id: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
      client_secret: 'u8yj8r01dKIExw-al9OEigYU',
      redirect_uri: `${process.env.DEPLOY_SITE}/v1/auth/google/callback`,
      grant_type: 'authorization_code',
    },
    facebook: {
      accessTokenUrl: 'https://graph.facebook.com/v2.8/oauth/access_token',
      profileFields: ['id', 'name', 'email']
      graphApiUrl() {
        return `https://graph.facebook.com/v2.8/me?fields=${this.profileFields.join(',')}`
      },
      client_id: '714795635361315',
      client_secret: '5b33a8a2a9d556114ffc5b5cabb3b7c7',
      redirect_uri: `${process.env.DEPLOY_SITE}/v1/auth/facebook/callback`,
      grant_type: 'authorization_code',
    },
  },
  hostUrl: process.env.DEPLOY_SITE,
  databaseURI: process.env.MONGO_URI,
  databaseOption: {
    user : process.env.MONGO_USER || null,
    pass : process.env.MONGO_PASS || null,
  },
}

export default config
