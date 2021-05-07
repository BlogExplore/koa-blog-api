// const Controller = require('../core/controller')
const userService = require('../service/user.service')
class UserController {
  async create(ctx, next) {
    const userInfo = ctx.request.body
    // 查询数据
    const result = await userService.create(userInfo)
    // console.log(this)
    // await this.resApi(true, 'success', {})
    next()
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query

    // 查询用户列表
    const userList = await userService.list(offset, size)
  }
}

module.exports = new UserController()
