const axios = require('axios')
const url = require('url')

class BLController {
  async fetchDynamic(ctx, next) {
    const res = await axios(
      'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?csrf=3a5ed65acd0ea773f0deb49711fa8fa1&visitor_uid=310726273&host_uid=310726273&offset_dynamic_id=0&need_top=1&platform=web'
    )
  }
  async fetchRepostDetail(ctx, next) {
    let url1 = `https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail?dynamic_id=516913002135599242`
    let url2 = `https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail?dynamic_id=516913002135599242&offset=1:20`
    let url3 = `https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail?dynamic_id=516913002135599242&offset=1:40`
    let url4 = `https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail?dynamic_id=516913002135599242&offset=0:518652794611618019`
    let url5 = `https://api.vc.bilibili.com/dynamic_repost/v1/dynamic_repost/repost_detail?dynamic_id=516913002135599242&offset=0:517106662216817479`

    const resArr = await Promise.allSettled([
      axios(url1),
      axios(url2),
      axios(url3),
      axios(url4),
      axios(url5),
    ])
    let arr = []

    for (let i = 0; i < resArr.length; i++) {
      arr.push(resArr[i].value.data.data.items)
    }
    let tempArr = [...arr[0], ...arr[1], ...arr[2], ...arr[3], ...arr[4]]
    let finArr = []

    for (let ele of tempArr) {
      finArr.push({
        uname: ele.desc.user_profile.info.uname,
        uid: ele.desc.uid,
      })
    }
    ctx.body = finArr
  }
}

module.exports = new BLController()
