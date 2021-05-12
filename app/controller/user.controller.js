// const Controller = require('../core/controller')
const userService = require('../service/user.service')
const { ErrorModel, SuccessModel } = require('../core/ResModel')
const { registerFail } = require('../constants/errorInfo')
class UserController {
  async register({ username, password, gender }) {
    console.log(`执行注册`)
    // 新增用户
    try {
      await userService.createUser({ username, password, gender })
      return new SuccessModel()
    } catch (error) {
      console.error(error.message, error.stack)
      return new ErrorModel(registerFail)
    }
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query

    // 查询用户列表
    const userList = await userService.list(offset, size)
  }
}

module.exports = new UserController()
