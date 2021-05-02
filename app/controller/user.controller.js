const userService = require('../service/user.service')
class UserController {
  async create(ctx, next) {
    const userInfo = ctx.request.body
    // 查询数据
    const result = await userService.create(userInfo)
    ctx.body = result
    next()
  }
}

module.exports = new UserController()
