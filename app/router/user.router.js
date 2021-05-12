const Router = require('@koa/router')
const {
  whetherUsernameAlreadyExists,
  passwordEncryption,
} = require('../middleware/user.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')

// JSON Schema 校验
const { genValidator } = require('../middleware/validator.middleware')
const userValidate = require('../validator/user.validate')

const userRouter = new Router({
  prefix: '/api/v1/user',
})

const { register } = require('../controller/user.controller')

/**
 * @description 用户注册
 * 校验入参是否ok
 * 判断用户名是否存在
 * 密码加密后存储
 */
userRouter.post(
  '/register',
  genValidator(userValidate),
  whetherUsernameAlreadyExists,
  passwordEncryption,
  async (ctx, next) => {
    const { username, password, gender } = ctx.request.body
    ctx.body = await register({
      username,
      password,
      gender,
    })
  }
)

module.exports = userRouter
