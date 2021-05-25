// const Controller = require('../core/controller')
const userService = require('../service/user.service')
const { ErrorModel, SuccessModel } = require('../core/ResModel')
const { registerFail, usernameNotExists } = require('../constants/errorInfo')
class UserController {
  async register({ username, password, gender }) {
    // 新增用户
    try {
      await userService.createUser({ username, password, gender })
      return new SuccessModel()
    } catch (error) {
      console.error(error.message, error.stack)
      return new ErrorModel(registerFail)
    }
  }

  async userIsExit(username) {
    const userInfo = await userService.getUserInfo(username)
    if (userInfo.length > 0) {
      return new SuccessModel(userInfo)
    } else {
      return new ErrorModel(usernameNotExists)
    }
  }

  async list(ctx, next){
    const { limit, offset } = ctx.query
    const res = await userService.list(limit, offset)
    ctx.body = new SuccessModel(res)
  }
}

module.exports = new UserController()
