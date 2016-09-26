import jwt from 'koa-jwt'
import Boom from 'boom'
import Config from '../config'

export const getToken = {
  ['JWT'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS512', expiresIn: Config.jwt.jwtTokenExpiresIn })
  },
  ['EMAIL'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS256', expiresIn: Config.jwt.emailTokenExpiresIn })
  },
  ['OAuth2'](user) {
    return jwt.sign(user, Config.jwt.jwtSecret, { algorithm: 'HS256', expiresIn: Config.jwt.OAuth2TokenExpiresIn })
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
        const TokenError = Boom.unauthorized('Token is not valid or expired')
        return reject(TokenError)
      }
      resolve(decoded)
    })
  })
}

export const getCleanUser = (user) => {
  const u = user.toObject()
  return {
    id: u._id,
    nickname: u.nickname,
    email: u.email,
    avatar: u.avatar,
    edit_nickname_time: u.nicknameChangeLimit,
    created_time: u.createdAt,
    updated_time: u.updatedAt
  }
}

export const getCleanPost = (post) => {
  const { author, comments } = post
  const p = post.toObject()
  return {
    id: p._id,
    author: getCleanUser(author),
    subject: p.subject,
    content: p.content,
    like_count: p.likeCount,
    dislike_count: p.dislikeCount,
    comments: comments.map(comment => getCleanComment(comment)),
    created_time: p.createdAt,
    updated_time: p.updatedAt
  }
}

export const getCleanComment = (comment) => {
  const { author } = comment
  const c = comment.toObject()
  return {
    id: c._id,
    author: getCleanUser(author),
    content: c.content,
    created_time: c.createdAt,
    updated_time: c.updatedAt
  }
}
