const baseFun = require('../lib/baseFun')
class Controller {
  constructor(ctx) {
    this.ctx = ctx
  }
  async resApi(ret, message, dataInfo, httpStatusCode = 200) {
    console.log(1212)
    // httpStatusCode = parseInt(httpStatusCode)
    // if (!httpStatusCode || httpStatusCode === 0) {
    //   httpStatusCode = 200
    // }
    // const params = {
    //   ret,
    //   message,
    //   dataInfo,
    //   httpStatusCode,
    // }
    // console.log(params)

    // baseFun.setResInfo({
    //   ctx: this.ctx,
    //   retCode: ret,
    //   message,
    //   dataInfo,
    //   httpStatusCode,
    // })
  }
}
module.exports = Controller
