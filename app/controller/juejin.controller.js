const axios = require('axios')
const url = require('url')
const { JJ_FANS_URL } = require('../config/index')
class JJController {
  async fetchFans(ctx, next) {
    const {
      request: { url: tUrl },
    } = ctx
    const myURL = url.parse(tUrl)
    const tempSearch = myURL.search.replace('?', '')

    const list = tempSearch.split('&')

    let obj = {}
    list.forEach((item) => {
      const arr = item.split('=')
      obj[arr[0]] = arr[1]
    })
    if ('jj_user_id' in obj) {
      obj.user_id = obj.jj_user_id
      delete obj.jj_user_id
    }
    const { data } = await axios(JJ_FANS_URL, {
      params: obj,
    })
    console.log(data)
    ctx.body = `请求掘金的粉丝成功`
    ctx.body = data
  }
}

module.exports = new JJController()
