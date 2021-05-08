const jwt = require('jsonwebtoken')
const {
  USER_NAME_KEY_NULL,
  PWD_KEY_NULL,
  USER_NAME_VAL_NULL,
  PWD_VAL_NULL,
  USER_NAME_NOT_ALREADY_EXISTS,
  PWD_IS_ERR,
  UN_PERMISSION,
} = require('../constants/errorTypes')
const { PUBLIC_PEM } = require('../config/index')
const passwordHandler = require('../extend/passwordHandler')
const userService = require('../service/user.service')
const verifyLogin = async (ctx, next) => {
  const userParams = ctx.request.body
  if (!('username' in userParams)) {
    const genErr = new Error(USER_NAME_KEY_NULL)
    return ctx.app.emit('error', genErr, ctx)
  }
  if (!('password' in userParams)) {
    const genErr = new Error(PWD_KEY_NULL)
    return ctx.app.emit('error', genErr, ctx)
  }
  const { username, password } = userParams
  if (!username.trim()) {
    const genErr = new Error(USER_NAME_VAL_NULL)
    return ctx.app.emit('error', genErr, ctx)
  }
  if (!password.trim()) {
    const genErr = new Error(PWD_VAL_NULL)
    return ctx.app.emit('error', genErr, ctx)
  }
  // 用户名是否不存在
  const findUserArr = await userService.getUserByName(username)

  if (!findUserArr) {
    const error = new Error(USER_NAME_NOT_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  if (passwordHandler(password) !== findUserArr[0].password) {
    const error = new Error(PWD_IS_ERR)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = findUserArr[0]
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
    console.log('result', result)
    ctx.user = result
    console.log(11111111111111)
    await next()
  } catch (err) {
    console.log(22222222222222)
    const error = new Error(UN_PERMISSION)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
}
