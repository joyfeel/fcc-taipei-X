import Router from 'koa-router'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import Post from '../../models/posts'
import { getCleanPost } from '../../utils/mixed'
import { bearerToToken, verifyToken } from '../../utils/auth'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/posts'
})

router.post('/',
  validate({
    'title:body': ['require', 'title is required or not valid'],
    'content:body': ['require', 'content is required or not valid'],
  }),
  async(ctx, next) => {
    try {
      const { authorization } = ctx.request.header
      const token = bearerToToken(authorization)
      const { userId } = await verifyToken(token)
      if (!userId) {
        throw Boom.create(401, 'Token is not valid or expired', { code: 401002 })
      }
      const article = {
        author: userId,
        ...ctx.request.body,
      }
      const post = new Post(article)
      await post.save()
      await post.populate('author').execPopulate()
      ctx.body = {
        code: 200004,
        status: 'success',
        post: getCleanPost(post),
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

router.get('/',
  validate({
    'page:query': ['isNumeric', 'Invalid page']
  }),
  async(ctx, next) => {
    try {
      const posts = await Post.find().skip(1).limit(10).sort({ createdAt: -1 }).deepPopulate('author comments.author').exec()
      ctx.body = {
        status: 'success',
        posts: posts.map(post => getCleanPost(post)),
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
