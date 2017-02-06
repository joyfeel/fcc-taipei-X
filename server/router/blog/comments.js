import Router from 'koa-router'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import validator from 'validator'
import Post from '../../models/posts'
import Comment from '../../models/comments'
import { getCleanComment, checkAuth } from '../../utils/mixed'
import Config from '../../config'

const minCommentCount = Config.dbSchema.comment.getMinCommentCount
const maxCommentCount = Config.dbSchema.comment.getMaxCommentCount

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
        post: postID,
        ...ctx.request.body,
      }
      const comment = new Comment(commentInfo)
      const storedComment = await comment.save()
      post.comments.push(storedComment._id)
      post.realCommentCount++
      await post.save()
      await comment.populate('author').execPopulate()
      ctx.body = {
        status: 'success',
        comment: getCleanComment(comment),
        // 此欄位是方便前端使用
        post: {
          post_id: postID,
          realCommentCount: post.realCommentCount
        },
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

/*
  此取得 comments API 的目的是讓使用者在
  點選 'view comments' 時才多取得一些 comments (3 ~ 5個)
  而不是一次取得全部
*/
router.get('/:postID',
  validate({
    'postID:params': ['require', 'isMongoId', 'Invalid postID'],
    // 原先擺 count (ctx.request.query.count)，但 koa-req-validator 好像沒辦法用 options 來驗證:<
    'currentCommentID:query': ['isMongoId', 'Invalid commentID'],
  }),
  async(ctx, next) => {
    try {
      // 這裡是 work around，用來驗證 comment count
      const strCount = ctx.request.query.count
      const validateCommentCount = validator.isInt(strCount, {
        min: minCommentCount,
        max: maxCommentCount,
      })
      if (!validateCommentCount) {
        throw Boom.create(422,
          `Get comment count must be between ${minCommentCount} ~ ${maxCommentCount} number`,
          { code: 422002 }
        )
      }

      // 從 token 找回 user id
      const { authorization } = ctx.request.header
      const { userId } = await checkAuth(authorization)
      if (!userId) {
        throw Boom.create(401, 'Token is not valid or expired', { code: 401002 })
      }
      // 檢查 文章ID 是否存在
      const { postID } = ctx.params
      const post = await Post.findById(postID)
      if (!post) {
        throw Boom.create(404, 'This post is not exist', { code: 404003 })
      }

      const count = Number(strCount)
      let commentLists

      const { currentCommentID } = ctx.request.query
      // 使用者可以不輸入 currentCommentID，那就表是取最初的幾筆 comments
      if (typeof currentCommentID === 'undefined') {
        commentLists = await Comment.find({
          post: postID,
        }).where('_id').sort('createdAt').limit(count).deepPopulate('author')
      } else {
        // 檢查 目前的評論ID 是否存在
        const currentComment = await Comment.findById(currentCommentID)
        if (!currentComment) {
          throw Boom.create(404, 'This comment is not exist', { code: 404004 })
        }
        // 從 評論ID 取其它的 comments
        commentLists = await Comment.find({
          post: postID,
        }).where('_id').gt(currentCommentID).sort('createdAt').limit(count).deepPopulate('author')
      }

      ctx.body = {
        status: 'success',
        comment: commentLists,
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
