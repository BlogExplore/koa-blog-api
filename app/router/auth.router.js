const Router = require('koa-router')

const authRouter = new Router({
  prefix: '/user',
})

const { login } = require('../controller/auth.controller')

authRouter.post('/login', login)

module.exports = authRouter
