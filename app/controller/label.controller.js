const LabelService = require('../service/label.service')
class LabelController {
  async create(ctx, next) {
    const { labelName } = ctx.request.body
    const res = await LabelService.create(labelName)

    ctx.body = `创建标签成功`
  }
  async list(ctx, next) {
    const { limit, offset } = ctx.query

    const res = await LabelService.list(limit, offset)
    ctx.body = res
  }
}

module.exports = new LabelController()
