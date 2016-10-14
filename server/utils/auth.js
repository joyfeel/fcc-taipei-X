import jwt from 'koa-jwt'
import Boom from 'boom'
import Config from '../config'

export const getToken = {
  ['JWT'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS512', expiresIn: Config.jwt.jwtTokenExpiresIn })
  },
  ['EMAIL'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS256', expiresIn: Config.jwt.emailTokenExpiresIn })
  }
}

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, Config.jwt.jwtSecret, (err, decoded) => {
      if (err) {
        const TokenError = Boom.unauthorized('Token is not valid or expired')
        return reject(TokenError)
      }
      resolve(decoded)
    })
  })
}
