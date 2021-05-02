const Router = require('koa-router')

const {
  authenticateUser,
  passwordEncryption,
} = require('../middleware/user.middleware')
const userRouter = new Router({
  prefix: '/user',
})

const { create } = require('../controller/user.controller')

userRouter.post('/register', authenticateUser, passwordEncryption, create)

module.exports = userRouter
