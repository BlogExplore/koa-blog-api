const jwt = require('jsonwebtoken')
const { UN_PERMISSION } = require('../constants/errorTypes')
const { PUBLIC_PEM } = require('../config/index')
const userService = require('../service/user.service')
const { SuccessModel, ErrorModel } = require('../core/ResModel')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  const findUserArr = await userService.getUserInfo(username)
  if (findUserArr.length > 0) {
    // 用户名ok
    ctx.user = findUserArr[0]
  } else {
    return new ErrorModel(usernameNotExists)
  }
  // 判断密码

  // if (passwordHandler(password) !== findUserArr[0].password) {
  //   const error = new Error(PWD_IS_ERR)
  //   return ctx.app.emit('error', error, ctx)
  // }

  //
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(UN_PERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  console.log(token)
  try {
    const result = jwt.verify(token, PUBLIC_PEM, {
      algorithms: ['RS256'],
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(UN_PERMISSION)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
}
