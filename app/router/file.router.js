const Router = require('@koa/router')

const { saveAvatar } = require('../controller/file.controller')
const { avatarHandler } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')
const fileRouter = new Router({
  prefix: '/api/v1/upload',
})
/**
 * @description 头像上传
 * verifyAuth 暂时取消
 */
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatar)
module.exports = fileRouter
