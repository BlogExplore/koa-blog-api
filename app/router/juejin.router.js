const Router = require('koa-router')

const jjRouter = new Router()

const { fetchFans } = require('../controller/juejin.controller')
jjRouter.get('/jjFans', fetchFans)

module.exports = jjRouter
