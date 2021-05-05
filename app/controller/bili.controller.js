const axios = require('axios')
const fs = require('fs')
const path = require('path')
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
    ctx.body = {
      code: 0,
      message: 'success',
      total: resArr[0].value.data.data.total,
      data: finArr,
    }
  }
  async followsList(ctx, next) {
    const { vmid, pn, ps } = ctx.query
    const url = `https://api.bilibili.com/x/relation/followers?vmid=${vmid}&pn=${pn}&ps=${ps}&order=desc&order_type=attention&jsonp=jsonp`
    const res = await axios(url)
    ctx.body = {
      code: 0,
      message: 'success',
      data: res.data.data,
    }
  }
  async fetchComment(ctx, next) {
    const pn = ctx.query.pn
    const url = `https://api.bilibili.com/x/v2/reply?jsonp=jsonp&pn=${pn}&type=11&oid=131276280&sort=2&_=1620144007375`
    const url1 = `https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=0&type=11&oid=131276280&mode=3&plat=1&_=1620187328858`
    const url2 = `https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=2&type=11&oid=131276280&mode=3&plat=1&_=1620187328860`
    const url3 = `https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=3&type=11&oid=131276280&mode=3&plat=1&_=1620187328861`
    const url4 = `https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=4&type=11&oid=131276280&mode=3&plat=1&_=1620187328862`
    const url5 = `https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=5&type=11&oid=131276280&mode=3&plat=1&_=1620187328863`
    const url6 = `https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=6&type=11&oid=131276280&mode=3&plat=1&_=1620187328864`

    const resArr = await Promise.allSettled([
      axios(url1),
      axios(url2),
      axios(url3),
      axios(url4),
      axios(url5),
    ])
    const dataArr = []
    resArr.forEach((item) => {
      dataArr.push(item.value.data.data.replies)
    })
    const finArr = [
      ...dataArr[0],
      ...dataArr[1],
      ...dataArr[2],
      ...dataArr[3],
      ...dataArr[4],
    ]
    // const res = await axios(url)
    // let result = []
    // let replies = res.data.data.replies
    // console.log(replies)
    // for (let ele of replies) {
    //   result.push({
    //     mid: ele.mid,
    //     uname: ele.member.uname,
    //     message: ele.content.message,
    //   })
    // }

    const ctxArr = []

    for (let ele of finArr) {
      ctxArr.push({
        mid: ele.mid,
        uname: ele.member.uname,
        message: ele.content.message,
      })
    }
    ctx.body = ctxArr
  }
  async fans(ctx, next) {
    const resArr = []
    const fileList = fs.readdirSync(path.resolve(__dirname, '../public/json'))
    for (let fileName of fileList) {
      const data = fs.readFileSync(
        path.resolve(__dirname, `../public/json/${fileName}`),
        'utf-8'
      )
      resArr.push(JSON.parse(data))
    }
    let finArr = []
    resArr.forEach((arr) => {
      for (let item of arr) {
        finArr.push(
          item.replace('https://space.bilibili.com/', '').replace('/', '')
        )
      }
    })
    ctx.body = [...new Set(finArr)]
  }
}

module.exports = new BLController()
