const validate = require('./index')

const SCHEMA = {
  type: 'object',
  properties: {
    title: {
      type: 'string', // 标题
    },
    content: {
      // 内容
      type: 'string',
    },
    summary: {
      type: 'string', // 摘要
    },
  },
}

function articleValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = articleValidate
