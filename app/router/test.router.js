const Router = require('@koa/router')

const router = new Router()
router.get('/', async (ctx, next) => {
  const res = await `success~~`
  ctx.body = res
  next()
})

module.exports = router
