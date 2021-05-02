const errorTypes = require('../constants/errorTypes')

const errInfoMap = new Map([
  ['用户名字段不能为空', 400],
  ['用户名不能为空', 400],
  ['密码不能为空', 400],
  ['密码字段不能为空', 400],
  ['用户名已经存在', 409],
  ['用户名不存在', 400],
  ['密码错误', 400],
  ['无效的Token', 401],
  ['没有权限联系管理员', 401],
  ['404', 404],
])

const errorHandler = ({ message }, ctx) => {
  const status = errInfoMap.get(message)

  if (typeof status === 'number') {
    ctx.status = status
  }

  ctx.body = message
}
module.exports = errorHandler
