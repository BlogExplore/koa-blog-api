const Ajv = require('ajv')

const ajv = new Ajv({})
/**
 * @description 校验
 * @param {*} schema json schema 规则
 * @param {*} data 等待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  console.log('valid', valid)
  if (!valid) {
    return ajv.errors[0]
  } else {
  }
}

module.exports = validate
