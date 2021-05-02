const {
  USER_NAME_KEY_NULL,
  PWD_KEY_NULL,
  USER_NAME_VAL_NULL,
  PWD_VAL_NULL,
  USER_NAME_ALREADY_EXISTS,
} = require('../constants/errorTypes')
const passwordHandler = require('../extend/passwordHandler')
const userService = require('../service/user.service')
const authenticateUser = async (ctx, next) => {
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
  // 用户名是否已经存在
  const findUser = await userService.getUserByName(username)
  if (findUser.length !== 0) {
    const error = new Error(USER_NAME_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}
/**
 * 密码加密
 */
const passwordEncryption = async (ctx, next) => {
  const { password } = ctx.request.body

  ctx.request.body.password = passwordHandler(password)
  await next()
}

module.exports = {
  authenticateUser,
  passwordEncryption,
}
