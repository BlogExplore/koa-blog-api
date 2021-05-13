/**
 * @description 密码加密
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/index')
/**
 * @description md5加密
 * @param {*} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

function doCrypto(pwd) {
  const str = `pwd=${pwd}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}
module.exports = doCrypto
