import { encode } from 'node-base64-image'

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
    title: p.title,
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
