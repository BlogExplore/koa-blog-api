const axios = require('axios')
const url = require('url')
const { JJ_FANS_URL } = require('../config/index')
class JJController {
  async followsList(ctx, next) {
    const res = await axios(
      `https://api.juejin.cn/user_api/v1/follow/followers?user_id=3491704661872910&cursor=${
        20 * (ctx.query.page - 1)
      }&limit=20`
    )
    ctx.body = {
      code: 0,
      data: res.data.data.data,
      count: res.data.data.count,
    }
  }
}

module.exports = new JJController()
