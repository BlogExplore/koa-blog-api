const Router = require('@koa/router')
const {
  whetherUsernameAlreadyExists,
  passwordEncryption,
} = require('../middleware/user.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')

const { verifyLogin } = require('../middleware/auth.middleware')

const { login } = require('../controller/auth.controller')

// JSON Schema 校验
const { genValidator } = require('../middleware/validator.middleware')
const registerValidate = require('../validator/register.validate')
const loginValidate = require('../validator/login.validate')
const userRouter = new Router({
  prefix: '/api/v1/user',
})

const { register, userIsExit, list } = require('../controller/user.controller')

/**
 * @description 用户注册接口
 * 校验入参是否ok
 * 判断用户名是否存在
 * 密码加密后存储
 */
userRouter.post(
  '/register',
  genValidator(registerValidate),
  whetherUsernameAlreadyExists,
  passwordEncryption,
  async (ctx, next) => {
    const { username, password } = ctx.request.body
    ctx.body = await register({
      username,
      password
    })
  }
)
/**
 * @description 判断用户名是不是已经存在
 */
userRouter.post('/isExit', async (ctx, next) => {
  const { username } = ctx.request.body
  ctx.body = await userIsExit(username)
})
/**
 * @description 登录接口
 * 首先就是用户名得有（得存在）
 * 密码校对一下子
 * 然后才是登录
 */
userRouter.post('/login', genValidator(loginValidate), verifyLogin, login)

/**
 * @descript 获取所有的用户
 * 不需要登录
 */
userRouter.get('/', list)

module.exports = userRouter
