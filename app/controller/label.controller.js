const LabelService = require('../service/label.service')
class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    console.log(name)
    const res = await LabelService.create(name)

    ctx.body = res
  }
}

module.exports = new LabelController()
