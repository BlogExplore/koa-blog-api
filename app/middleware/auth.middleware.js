const jwt = require('jsonwebtoken')
const { UN_PERMISSION } = require('../constants/errorTypes')
const {
  pwdFail,
  usernameNotExists,
  permissionFail,
} = require('../constants/errorInfo')
const { PUBLIC_PEM } = require('../config/index')
const userService = require('../service/user.service')
const { SuccessModel, ErrorModel } = require('../core/ResModel')
const doCrypto = require('../utils/crypto')
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  try {
    const findUserArr = await userService.getUserInfo(username)
    if (findUserArr.length > 0) {
      // 用户名ok

      // 判断密码
      const pwd = findUserArr[0]['password']

      if (doCrypto(password) === pwd) {
        ctx.user = findUserArr[0]
        // return new SuccessModel()
      } else {
        // 密码错误
        return new ErrorModel(pwdFail)
      }
    } else {
      return new ErrorModel(usernameNotExists)
    }
    //
    await next()
  } catch (err) {}
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    ctx.body = new ErrorModel(permissionFail)
    return
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, PUBLIC_PEM, {
      algorithms: ['RS256'],
    })
    ctx.user = result
    await next()
  } catch (err) {
    ctx.body = new ErrorModel(permissionFail)
    return
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
}
