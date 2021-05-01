const url = require('url')
const { JJ_FANS_URL } = require('../config/index')
class JJController {
  async fetchFans(ctx, next) {
    console.log(JJ_FANS_URL)
    console.log(ctx)

    const {
      request: { url },
    } = ctx

    console.log(url)
    ctx.body = '123'
  }
}

module.exports = new JJController()
