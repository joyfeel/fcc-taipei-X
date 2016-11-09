import Router from 'koa-router'
import Boom from 'boom'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { bearerToToken, verifyToken } from '../../utils/auth'
import { getCleanUser, canPostArticle, checkAuth } from '../../utils/mixed'
import Config from '../../config'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/checkPostLimit',
})

router.get('/',
  async(ctx, next) => {
    try {
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

      ctx.body = {
        code: 200005,
        status: 'success',
        create_post_time: user.create_post_time,
        message: `You have allowed to post articles`,
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
