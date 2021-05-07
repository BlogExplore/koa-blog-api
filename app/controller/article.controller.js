// const Controller = require('../core/controller')
const ArticleService = require('../service/article.service')

class ArticleController {
  async create(ctx, next) {
    const userId = ctx.user.id // 用户id
    const con = ctx.request.body.content // 内容
    const res = await ArticleService.create(userId, con)
    ctx.body = res
  }
}

module.exports = new ArticleController()
