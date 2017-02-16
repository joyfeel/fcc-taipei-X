const env = process.env.NODE_ENV || 'development'
const config = {
  development: require('./development.js'),
  production: require('./production.js'),
}

module.exports = config[env]
