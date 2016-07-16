import jwt from 'koa-jwt'
import Config from '../config'

// Please note that exp is only set if the payload is an object liberal.
// expiresIn: second (unit)
// getToken['JWT'](email)
export const getToken = {
  ['JWT'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS512', expiresIn: Config.jwt.jwtTokenExpiresIn })
  },
  ['EMAIL'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS256', expiresIn: Config.jwt.emailTokenExpiresIn })
  }
}

// export const getEmailToken = (email) => {
//   return new Promise((resolve, reject) => {
//     jwt.sign(email, config.jwtSecret, { algorithm: 'HS256', expiresIn: 60 * 60 }, (err, token) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(token)
//       }
//     })
//   })
// }

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, Config.jwt.jwtSecret, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}

export const getCleanUser = (user) => {
  const u = user.toObject()
  return {
    _id: u._id,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
    nickname: u.nickname,
    email: u.email,
    photo: u.photo,
    isEmailActived: u.isEmailActived
  }
}
