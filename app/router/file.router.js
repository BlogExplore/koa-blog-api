const Router = require('koa-router')

const { saveFile } = require('../controller/file.controller')
const { avatarHandler } = require('../middleware/file.middleware')

const fileRouter = new Router({
  prefix: '/api/v1/upload',
})

fileRouter.post('/avatar', avatarHandler, saveFile)
module.exports = fileRouter
