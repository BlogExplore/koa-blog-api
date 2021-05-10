/**
 * @description 统一化响应数据的模型
 */
class ResModel {
  constructor({ code, data, message }) {
    this.code = code
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends ResModel {
  constructor(data = {}) {
    super({ code: 0, data })
  }
}

class ErrorModel extends ResModel {
  constructor({ code, message }) {
    super({ code, message })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
}
