const Router = require('@koa/router')

const BiLiRouter = new Router({
  prefix: '/api/v1/bili',
})

const {
  fetchDynamic,
  fetchRepostDetail,
  followsList,
  fetchComment,
  fans,
} = require('../controller/bili.controller')
BiLiRouter.get('/dynamic', fetchDynamic)

BiLiRouter.get('/repostDetail', fetchRepostDetail) // 获取某条评论的转发数据
BiLiRouter.get('/comment', fetchComment) // 获取某条评论的评论数据
BiLiRouter.get('/follows', followsList) // 获取小洋同学的粉丝朋友们
BiLiRouter.get('/fans', fans) // 获取小洋同学的粉丝朋友们

module.exports = BiLiRouter
