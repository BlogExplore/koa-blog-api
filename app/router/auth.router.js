const Router = require('koa-router')

const authRouter = new Router({
  prefix: '/user',
})

const { verifyLogin } = require('../middleware/auth.middleware')

const { login } = require('../controller/auth.controller')

authRouter.post('/login', verifyLogin, login)

module.exports = authRouter
