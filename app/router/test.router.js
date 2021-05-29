const Router = require('@koa/router')

router.get('/', async (ctx, next) => {
  const res = await `success~~`
  ctx.body = res
  next()
})

module.exports = router
