const Router = require('@koa/router')
const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware')
const {
  create,
  list,
  detail,
  addLabels,
  fileInfo,
} = require('../controller/article.controller')
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
/**
 * @description 文章添加标签
 * 需要登录
 * 有权限问题 一人只能添加一人的标签
 * 标签存在
 * 执行添加
 */
router.post('/:articlesId/labels', verifyAuth, addLabels)

/**
 * @description 根据文件名去获取文件
 */

router.get('/cover/:filename', fileInfo)

module.exports = router
