const Router = require('@koa/router')
const {
  authenticateUser,
  passwordEncryption,
} = require('../middleware/user.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')

const userRouter = new Router({
  prefix: '/user',
})

const { create, list } = require('../controller/user.controller')
// 用户注册
userRouter.post('/register', authenticateUser, passwordEncryption, create)
// 获取用户列表
userRouter.get('/list', list)
module.exports = userRouter
