const { SuccessModel } = require('../core/ResModel')
const FileService = require('../service/file.service')
const { APP_HOST, APP_PORT } = require('../config/index')

class FileController {
  async saveAvatar(ctx, next) {
    // console.log(ctx.file)
    const { filename, mimetype, size } = ctx.file
    const { id } = ctx.user
    // 图像信息保存数据库
    await FileService.createAvatar({ filename, mimetype, size, id })
    // 图像信息保存 users 表中
    const baserUrlAvatar = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await FileService.updateAvatarByUserId({ baserUrlAvatar, id })

    ctx.body = new SuccessModel()
  }
}

module.exports = new FileController()
