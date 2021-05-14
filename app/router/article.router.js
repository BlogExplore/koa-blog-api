const Router = require('@koa/router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list } = require('../controller/article.controller')
const router = new Router({
  prefix: '/api/v1/article',
})
/**
 * @description 创建一篇文章
 * 用户必须登录才可
 */
router.post('/', verifyAuth)

/**
 * @description 获取所有的文章列表
 */

router.get('/', list)

module.exports = router
