import Koa from 'koa'
import views from 'koa-views'
import serve from 'koa-static'
import rootRoutes from './routes/index'
import userRoutes from './routes/user'

const app = new Koa()

app.use(async(ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.status = err.status || 500
    if (ctx.status === 404) {
      await ctx.render('404')
    } else {
      //Other error handling
      await ctx.render('other_error')
    }
  }
})

//app.use(views(`${__dirname}/views`, { extension: 'jade' }))
//app.use(serve(`${__dirname}/public`))
//app.use(rootRoutes.routes())
//app.use(userRoutes.routes())

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

export default app
