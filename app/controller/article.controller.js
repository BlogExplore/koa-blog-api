const ArticleService = require('../service/article.service')
const { SuccessModel } = require('../core/ResModel')
class ArticleController {
  async create(ctx, next) {
    const userId = ctx.user.id // 用户id
    const { title, content, summary } = ctx.request.body // 内容
    const res = await ArticleService.create({ title, content, summary, userId })
    ctx.body = new SuccessModel(res)
  }
  /**
   * @description 分页获取列表
   */
  async list(ctx, next) {
    const { offset, limit } = ctx.query
    try {
      const res = await ArticleService.list({ offset, limit })
      ctx.body = new SuccessModel(res)
    } catch (error) {}
  }
  async detail(ctx, next) {
    const { articleId } = ctx.params
    try {
      // 根据id查询
      const res = await ArticleService.getInfoById(articleId)
      ctx.body = new SuccessModel(res)
    } catch (error) {}
  }
}

module.exports = new ArticleController()
