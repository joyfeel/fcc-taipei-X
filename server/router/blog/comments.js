import Router from 'koa-router'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import Post from '../../models/posts'
import Comment from '../../models/comments'
import { getCleanComment } from '../../utils/mixed'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/comments'
})

router.post('/',
  validate({
    'author:body': ['require', 'isMongoId', 'authorId is required or not a mongo objectId'],
    'post:body': ['require', 'isMongoId', 'postId is required or not a mongo objectId'],
    'content:body': ['require', 'content is required or not valid']
  }),
  async(ctx, next) => {
    try {
      // 1. Get the postId
      const { post } = ctx.request.body
      // 2. Use the postId to find post document
      const targetPost = await Post.findById(post)
      // 3. Save the comment to database, then get the commentId
      const comment = new Comment(ctx.request.body)
      const storedComment = await comment.save()
      // 4. Insert the commentId in the post document
      targetPost.comments.push(storedComment._id)
      await targetPost.save()

      await comment.populate('author').execPopulate()
      ctx.response.body = {
        status: 'success',
        comment: getCleanComment(comment)
      }
    } catch (err) {
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

export default router
