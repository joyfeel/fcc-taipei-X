import Router from 'koa-router'
import Post from '../models/posts'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getCleanPost } from '../utils/mixed'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/posts'
})

router.post('/',
  validate({
    'author:body': ['require', 'isMongoId', 'authorId is required or not a mongo objectId'],
    'subject:body': ['require', 'subject is required or not valid'],
    'content:body': ['require', 'content is required or not valid']
  }),
  async(ctx, next) => {
    try {
      const post = new Post(ctx.request.body)
      await post.save()
      await post.populate('author').execPopulate()
      ctx.response.body = {
        status: 'success',
        post: getCleanPost(post)
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
  async(ctx, next) => {
    try {
      const posts = await Post.find().deepPopulate('author comments.author').exec()
      ctx.response.body = {
        status: 'success',
        posts: posts.map(post => getCleanPost(post))
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
