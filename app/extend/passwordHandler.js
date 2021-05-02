const crypto = require('crypto')

const passwordHandler = (password) => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(password).digest('hex')
  return result
}

module.exports = passwordHandler
