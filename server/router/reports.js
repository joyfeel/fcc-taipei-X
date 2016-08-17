import Router from 'koa-router'

const router = new Router({
  prefix: '/v1/reports'
})

router.get('/', async(ctx, next) => {
  try {
    ctx.response.body = {
      result: 'YA'
    }
  } catch (err) {
    ctx.throw(err.output.statusCode, err)
  }
})

export default router
