const Router = require('@koa/router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list, detail } = require('../controller/article.controller')
const { articleValidate } = require('../validator/article.validate')
const { genValidator } = require('../middleware/validator.middleware')

const router = new Router({
  prefix: '/api/v1/article',
})
/**
 * @description 创建一篇文章
 * 用户必须登录才可
 */
router.post('/', verifyAuth, create)

/**
 * @description 获取所有的文章列表
 */

router.get('/', list)

/**
 * @description 根据文章id获取详情
 */
router.get('/:articleId', detail)
module.exports = router
