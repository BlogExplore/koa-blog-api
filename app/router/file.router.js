const Router = require('@koa/router')

const { saveAvatar, saveCover } = require('../controller/file.controller')
const { avatarHandler, coverHandler } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')
const fileRouter = new Router({
  prefix: '/api/v1/upload',
})
/**
 * @description 头像上传
 * verifyAuth 暂时取消
 */
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatar)

/**
 * @description 添加文章封面
 * 一张图片
 * 需要登录
 * 暂时不需要预览图片
 * 开始保存
 */
fileRouter.post('/cover', verifyAuth, coverHandler, saveCover)
module.exports = fileRouter
