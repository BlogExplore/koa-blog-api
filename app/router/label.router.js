const Router = require('@koa/router')
const { create, list } = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const router = new Router({
  prefix: '/api/v1/label',
})
/**
 * @description 创建标签
 */
router.post('/', verifyAuth, create)
/**
 * @description 获取标签列表
 * 不需要 token 验证
 */
router.get('/', list)
module.exports = router
