const { ErrorModel } = require('../core/ResModel')
const { registerUserNameExit } = require('../constants/errorInfo')
const userService = require('../service/user.service')
const doCrypto = require('../utils/crypto')
/**
 * @description 判断用户名有没有注册过
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const whetherUsernameAlreadyExists = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 获取用户信息
  const userInfo = await userService.getUserInfo(username, password)
  if (userInfo) {
    // 用户已经存在
    return new ErrorModel(registerUserNameExit)
  }
  await next()
}
/**
 * 密码加密
 */
const passwordEncryption = async (ctx, next) => {
  const { password } = ctx.request.body

  ctx.request.body.password = doCrypto(password)
  await next()
}

module.exports = {
  whetherUsernameAlreadyExists,
  passwordEncryption,
}
