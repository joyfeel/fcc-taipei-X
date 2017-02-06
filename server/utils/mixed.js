import { encode } from 'node-base64-image'
import User from '../models/users'
import { bearerToToken, verifyToken } from './auth'

export const getCleanUser = (user) => {
  const u = user.toObject()
  return {
    id: u._id,
    nickname: u.nickname,
    email: u.email,
    avatar: u.avatar,
    edit_nickname_time: u.nicknameChangeLimit,
    create_post_time: u.createdPostLimit,
    created_time: u.createdAt,
    updated_time: u.updatedAt,
  }
}

export const getCleanPost = (post) => {
  const { author } = post
  const p = post.toObject()
  return {
    id: p._id,
    author: getCleanUser(author),
    title: p.title,
    content: p.content,
    like_count: p.likeCount,
    dislike_count: p.dislikeCount,
    comments: [],     // 一開始不給前端 comments，前端必須自己調用 get comment API
    realCommentCount: p.realCommentCount,
    created_time: p.createdAt,
    updated_time: p.updatedAt,
  }
}

export const getCleanComment = (comment) => {
  if (typeof comment.author === 'undefined') {
    return null
  }
  const { author } = comment
  const c = comment.toObject()
  return {
    id: c._id,
    author: getCleanUser(author),
    content: c.content,
    created_time: c.createdAt,
    updated_time: c.updatedAt,
  }
}

export const encodeRemoteImg = (picture) => {
  return new Promise((resolve, reject) => {
    encode(picture, { string: true }, (err, img) => {
      if (err) {
        return reject(err)
      }
      resolve(`data:image/jpeg;base64,${img}`)
    })
  })
}

export const canPostArticle = async (userId) => {
  const findUser = await User.findById(userId)
  const canPost = await User.findById(userId).where('createdPostLimit').lt(new Date())
  return {
    findUser,
    canPost,
  }
}

export const getCreatePostTime = async (userId) => {
  const findUser = await User.findById(userId)
  const { create_post_time } = getCleanUser(findUser)
  return create_post_time
}

export const checkAuth = async (authorization) => {
  const token = bearerToToken(authorization)
  return await verifyToken(token)
}
