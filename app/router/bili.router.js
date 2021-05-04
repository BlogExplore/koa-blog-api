const Router = require('koa-router')

const BiLiRouter = new Router()

const {
  fetchDynamic,
  fetchRepostDetail,
} = require('../controller/bili.controller')
BiLiRouter.get('/dynamic', fetchDynamic)

BiLiRouter.get('/repostDetail', fetchRepostDetail) // 获取某条评论的转发数据
module.exports = BiLiRouter
