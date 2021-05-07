const Router = require('@koa/router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { create } = require('../controller/article.controller')
const router = new Router({
  prefix: '/article',
})
// 创建文章必须要登录后
router.post('/', verifyAuth, create)

module.exports = router
