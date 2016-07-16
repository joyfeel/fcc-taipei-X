import Router from 'koa-router'
import mongoose from 'mongoose'
import Boom from 'boom'

const router = new Router({
  prefix: '/v1/reports'
})

router.get('/', async(ctx, next) => {
  try {
    ctx.response.status = 200
  } catch (err) {
    ctx.throw(err.output.statusCode, err)
  }
})

export default router
