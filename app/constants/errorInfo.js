/**
 * @description 错误信息
 */
const errTypes = require('./errorTypes')
module.exports = {
  registerUserNameExit: {
    // 用户名已存在
    code: 10001,
    message: errTypes.USER_NAME_ALREADY_EXISTS,
  },
  registerFail: {
    // 注册失败
    code: 10002,
    message: errTypes.REGISTER_FAIL,
  },
  usernameNotExists: {
    // 用户名不存在
    code: 10003,
    message: errTypes.USER_NAME_NOT_ALREADY_EXISTS,
  },
  pwdFail: {
    // 密码错误
    code: 10004,
    message: errTypes.PWD_IS_ERR,
  },
  jsonSchemaFail: {
    code: 10009,
    message: errTypes.JSON_SCHEMA_FAIL,
  },
  permissionFail: {
    // 没有权限
    code: 10010,
    message: errTypes.UN_PERMISSION,
  },
}
