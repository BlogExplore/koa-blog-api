const Multer = require('@koa/multer')
const { AVATAR_PATH, COVER_IMG_PATH } = require('../constants/filePath')

const avatarUpload = Multer({
  dest: AVATAR_PATH,
})

const articleCoverUpload = Multer({
  dest: COVER_IMG_PATH,
})

const avatarHandler = avatarUpload.single('avatar') // 用户头像
const coverHandler = articleCoverUpload.array('cover', 9) // 暂时上传9张

/**
 * @description 图片预览图
 */
const imgsResize = async (ctx, next) => {
  try {
    const files = ctx.req.files
    files.forEach((item) => {
      const destPath = path.join(file.destination, file.filename)
    })

    await next()
  } catch (error) {}
}

module.exports = {
  avatarHandler,
  coverHandler,
  imgsResize,
}
