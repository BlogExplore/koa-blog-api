/**
 * @description schema 中间件校验
 */

const { ErrorModel } = require('../core/ResModel')

const { jsonSchemaFail } = require('../constants/errorInfo')
/**
 *
 * @param {*} validateFn 验证函数
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body

    const err = validateFn(data)

    if (err) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFail)
    }
    await next()
  }

  return validator // 返回中间件
}
module.exports = {
  genValidator,
}
