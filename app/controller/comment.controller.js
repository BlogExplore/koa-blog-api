const service = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const userId = ctx.user.id // 用户id
    const { articleId, content } = ctx.request.body // 文章id 评论的内容
    const result = await service.create({ articleId, content, userId })
    ctx.body = result
  }
  async doReply(ctx, next) {
    const { articleId, content } = ctx.request.body // 文章id 和内容
    const { commentId } = ctx.params // 评论的id
    const userId = ctx.user.id // 用户id
    const res = await service.doReply({ articleId, content, commentId, userId })
    ctx.body = res
  }
  async list(ctx, next) {
    console.log(123)
    const { articleId } = ctx.query // 文章ID

    const result = await service.getCommentsArticleId(articleId)
    ctx.body = result
  }
}

module.exports = new CommentController()
