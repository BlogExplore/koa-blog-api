const LabelService = require('../service/label.service')
const { SuccessModel } = require('../core/ResModel')
class LabelController {
  async create(ctx, next) {
    const { labelName } = ctx.request.body
    const res = await LabelService.create(labelName)
    console.log(res)
    ctx.body = new SuccessModel()
  }
  async list(ctx, next) {
    const { limit, offset } = ctx.query

    const res = await LabelService.list(limit, offset)
    ctx.body = new SuccessModel(res)
  }
}

module.exports = new LabelController()
