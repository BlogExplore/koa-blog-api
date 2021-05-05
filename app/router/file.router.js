const Router = require('koa-router')

const { saveFile } = require('../controller/file.controller')

const fileRouter = new Router({
  prefix: '/api/v1/upload',
})

fileRouter.post('/avatar', saveFile)
module.exports = fileRouter
