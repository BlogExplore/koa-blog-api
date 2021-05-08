/**
 * 设置统一的响应的数据
 * @param {*} param
 */
function setResInfo({ ctx, retCode, message, dataInfo, httpStatusCode }) {
  let retInfo = {}
  if (!retCode) {
    retInfo = {
      code: -1,
      message: message || 'error',
      data: dataInfo || {},
    }
  } else {
    retInfo = {
      code: 0,
      message: message || 'success',
      data: dataInfo || {},
    }
  }

  ctx.response.status = httpStatusCode
  ctx.response.body = retInfo
}

module.exports = {
  setResInfo,
}
