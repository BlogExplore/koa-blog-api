const Router = require('@koa/router')
const {
  authenticateUser,
  passwordEncryption,
} = require('../middleware/user.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')

const userRouter = new Router({
  prefix: '/api/v1/user',
})

const { create, list } = require('../controller/user.controller')
/**
 * @description 用户注册
 * @middlewares 判断用户名有没有注册过 密码加密后存储
 */
userRouter.post('/register', authenticateUser, passwordEncryption, create)

module.exports = userRouter
