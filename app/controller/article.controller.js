const ArticleService = require('../service/article.service')
const { SuccessModel } = require('../core/ResModel')
class ArticleController {
  async create(ctx, next) {
    const userId = ctx.user.id // 用户id
    const content = ctx.request.body.content // 内容
    const res = await ArticleService.create(userId, content)
    ctx.body = new SuccessModel(res)
  }

  async list() {
    const { offset, limit } = ctx.query
    // 列表查询
    console.log(offset, limit)
    // const res = await ArticleService.list(offset, limit)

    // ctx.body = new SuccessModel(res)
  }
}

module.exports = new ArticleController()
