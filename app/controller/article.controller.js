const articleService = require('../service/article.service')
const { SuccessModel } = require('../core/ResModel')
const { COVER_IMG_PATH } = require('../constants/filePath')
const { getFileByFilename } = require('../service/file.service')

const fs = require('fs')
class ArticleController {
  async create(ctx, next) {
    const userId = ctx.user.id // 用户id
    const { title, content, summary } = ctx.request.body // 内容
    const res = await articleService.create({ title, content, summary, userId })
    ctx.body = new SuccessModel(res)
  }
  /**
   * @description 分页获取列表
   */
  async list(ctx, next) {
    const { offset, limit } = ctx.query
    try {
      const res = await articleService.list({ offset, limit })
      ctx.body = new SuccessModel(res)
    } catch (error) {}
  }
  async detail(ctx, next) {
    const { articleId } = ctx.params
    try {
      // 根据id查询
      const res = await articleService.getInfoById(articleId)
      ctx.body = new SuccessModel(res)
    } catch (error) {}
  }

  async addLabels(ctx, next) {
    try {
      const { articlesId } = ctx.params // 文章的id
      const { labelIds } = ctx.request.body
      // 添加所有的标签
      if (Array.isArray(labelIds)) {
        for (let id of labelIds) {
          await articleService.addLabel(articlesId, id)
        }
      }
      ctx.body = new SuccessModel()
    } catch (error) {
      ctx.body = `err`
    }
  }

  async fileInfo(ctx, next) {
    try {
      let { filename } = ctx.params
      const fileInfo = await getFileByFilename(filename)
      ctx.response.set('content-type', fileInfo.mimetype)
      console.log(fileInfo)
      ctx.body = fs.createReadStream(`${COVER_IMG_PATH}/${filename}`)
    } catch (error) {}
  }
}

module.exports = new ArticleController()
