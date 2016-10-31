import port from './env/port'
import jwt from './env/jwt'
import mail from './env/mail'
import db from './env/db'
import auth from './env/auth'

//const env = process.env.NODE_ENV || 'development'
const env = 'development'
const config = require(`./env/${env}`).default

export default {
  ...port,
  ...config,
  ...jwt,
  ...mail,
  ...db,
  ...auth
}
