const ArticleService = require('../service/article.service')
const { SuccessModel } = require('../core/ResModel')
class ArticleController {
  async create(ctx, next) {
    const userId = ctx.user.id // 用户id
    const { title, content, summary } = ctx.request.body // 内容
    const res = await ArticleService.create({ title, content, summary, userId })
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
