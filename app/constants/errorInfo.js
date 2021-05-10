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
}
