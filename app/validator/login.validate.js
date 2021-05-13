const validate = require('./index')

const SCHEMA = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    // required: ['username', 'password'],
  },
}

function loginValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = loginValidate
