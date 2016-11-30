import Router from 'koa-router'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import Post from '../../models/posts'
import Comment from '../../models/comments'
import { getCleanComment, checkAuth } from '../../utils/mixed'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/comments',
})

router.post('/:postID',
  validate({
    'postID:params': ['require', 'isMongoId', 'Invalid postID'],
    'content:body': ['require', 'content is required or not valid'],
  }),
  async(ctx, next) => {
    try {
      // 從 token 找回 user id
      const { authorization } = ctx.request.header
      const { userId } = await checkAuth(authorization)
      if (!userId) {
        throw Boom.create(401, 'Token is not valid or expired', { code: 401002 })
      }
      // 檢查 postID 是否存在
      const { postID } = ctx.params
      const post = await Post.findById(postID)
      if (!post) {
        throw Boom.create(404, 'This post is not exist', { code: 404003 })
      }
      // Save the comment to database and get commentID
      const commentInfo = {
        author: userId,
        ...ctx.request.body,
      }
      const comment = new Comment(commentInfo)
      const storedComment = await comment.save()
      post.comments.push(storedComment._id)
      await post.save()
      await comment.populate('author').execPopulate()
      ctx.body = {
        status: 'success',
        comment: getCleanComment(comment),
      }
    } catch (err) {
      if (err.output && err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

export default router
