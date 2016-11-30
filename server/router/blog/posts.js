import Router from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import Post from '../../models/posts'
import { getCleanUser, getCleanPost, canPostArticle, checkAuth } from '../../utils/mixed'
import Config from '../../config'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/posts',
})

router.post('/',
  validate({
    'title:body': ['require', 'title is required or not valid'],
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
      // 判斷 user 能否發文
      const { findUser, canPost } = await canPostArticle(userId)
      const user = getCleanUser(findUser)
      if (!canPost) {
        throw Boom.create(403, `You can't repeatly post article in ${Config.user.createdPostTime}`, {
          code: 403003,
          create_post_time: user.create_post_time,
        })
      }
      const article = {
        author: userId,
        ...ctx.request.body,
      }

      _.extend(canPost, {
        createdPostLimit: Config.user.createdPostLimit(),
      })
      await canPost.save()
      const post = new Post(article)
      await post.save()
      await post.populate('author').execPopulate()
      ctx.body = {
        status: 'success',
        code: 200004,
        post: getCleanPost(post),
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

router.get('/findPresent',
  async(ctx, next) => {
    try {
      const count = Config.user.loadPostCount()
      const posts = await Post.find().sort('-createdAt').limit(count).deepPopulate('author comments.author')
      ctx.body = {
        status: 'success',
        code: 200006,
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

router.get('/findOlder',
  validate({
    'postID:query': ['isMongoId', 'Invalid postID'],
  }),
  async(ctx, next) => {
    try {
      const count = Config.user.loadPostCount()
      const { postID } = ctx.request.query
      const posts = await Post.find().where('_id').lt(postID).sort('-createdAt').limit(count).deepPopulate('author comments.author')
      ctx.body = {
        status: 'success',
        code: 200006,
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

router.get('/findNewer',
  validate({
    'postID:query': ['isMongoId', 'Invalid postID'],
  }),
  async(ctx, next) => {
    try {
      const count = Config.user.loadPostCount()
      const { postID } = ctx.request.query
      const posts = await Post.find().where('_id').gt(postID).sort('createdAt').limit(count).deepPopulate('author comments.author')
      posts.sort((a, b) => {
        return a._id < b._id
      })
      ctx.body = {
        status: 'success',
        code: 200006,
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

router.patch('/:postID',
  validate({
    'postID:params': ['require', 'isMongoId', 'Invalid postID'],
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
      const article = await Post.findById(postID)
      if (!article) {
        throw Boom.create(404, 'This post is not exist', { code: 404003 })
      }
      // 只有作者本人才可編輯文章
      let { author } = article
      author = author.toString()
      if (author !== userId) {
        throw Boom.create(403, `Edit other people's post is not allowed`, { code: 403004 })
      }
      const updatedPost = await Post.findByIdAndUpdate(postID, ctx.request.body, { new: true })
      await updatedPost.populate('author').execPopulate()
      ctx.body = {
        status: 'success',
        code: 200007,
        post: getCleanPost(updatedPost),
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

router.delete('/:postID',
  validate({
    'postID:params': ['require', 'isMongoId', 'Invalid postID'],
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
      const article = await Post.findById(postID)
      if (!article) {
        throw Boom.create(404, 'This post is not exist', { code: 404003 })
      }
      // 只有作者本人才可刪除文章
      let { author } = article
      author = author.toString()
      if (author !== userId) {
        throw Boom.create(403, `Delete other people's post is not allowed`, { code: 403005 })
      }
      const updatedPost = await Post.findByIdAndRemove(postID)
      await updatedPost.populate('author').execPopulate()
      ctx.body = {
        status: 'success',
        code: 200008,
        post: getCleanPost(updatedPost),
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
