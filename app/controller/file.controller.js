const { SuccessModel } = require('../core/ResModel')
const fileService = require('../service/file.service')
const { APP_HOST, APP_PORT } = require('../config/index')

class FileController {
  async saveAvatar(ctx, next) {
    // console.log(ctx.file)
    const { filename, mimetype, size } = ctx.file
    const { id } = ctx.user
    // 图像信息保存数据库
    await fileService.createAvatar({ filename, mimetype, size, id })
    // 图像信息保存 users 表中
    const baserUrlAvatar = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await fileService.updateAvatarByUserId({ baserUrlAvatar, id })

    ctx.body = new SuccessModel()
  }
  async saveCover(ctx, next) {
    const { filename, mimetype, size } = ctx.file // 封面的相关信息
    const { id } = ctx.user // 用户id
    // const { articleId } = ctx.query // 没有文章的id

    // 文件信息入库
    try {
      await fileService.saveCover({ filename, mimetype, size, id })
      const coverImg = `${APP_HOST}:${APP_PORT}/api/v1/article/cover/${filename}`
      ctx.body = new SuccessModel({
        coverImg,
      })
    } catch (error) {}
  }
}

module.exports = new FileController()
