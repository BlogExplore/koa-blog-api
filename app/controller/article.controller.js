// const Controller = require('../core/controller')
const ArticleService = require('../service/article.service')

class ArticleController {
  async create(ctx, next) {
    const userId = ctx.user.id // 用户id
    const con = ctx.request.body.content // 内容
    const res = await ArticleService.create(userId, con)
    ctx.body = res
  }

  async list() {
    const { offset, limit } = ctx.query
    // 列表查询
    const res = await ArticleService.list(offset, limit)
  }
}

module.exports = new ArticleController()
