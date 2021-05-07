const Router = require('@koa/router')

const jjRouter = new Router({
  prefix: '/api/v1/juejin',
})

const { followsList, fans } = require('../controller/juejin.controller')
jjRouter.get('/follows', followsList)

module.exports = jjRouter
