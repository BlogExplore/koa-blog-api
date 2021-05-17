const Router = require('@koa/router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { create, doReply, list } = require('../controller/comment.controller')
const router = new Router({
  prefix: '/api/v1/comment',
})
/**
 * @description 发表文章的评论
 * 发表评论需登录
 */
router.post('/', verifyAuth, create)

/**
 * @description 回复一条评论
 * 必须得登录
 */
router.post('/:commentId/reply', verifyAuth, doReply)
/**
 * @description 删除评论
 */
router.delete('/:commentId')

/**
 * @description 获取所有的评论列表
 */
router.get('/', verifyAuth, list)
module.exports = router
