// const Controller = require('../core/controller')
const userService = require('../service/user.service')
const { ErrorModel, SuccessModel } = require('../core/ResModel')
const { registerUserNameExit, registerFail } = require('../constants/errorInfo')
class UserController {
  async register({ username, password, gender }) {
    // 获取用户信息
    const userInfo = await userService.getUserInfo(username, password)
    if (userInfo) {
      // 用户已经存在
      console.log(registerUserNameExit)
      return new ErrorModel(registerUserNameExit)
    }
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
