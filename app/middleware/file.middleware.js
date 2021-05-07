const Multer = require('@koa/multer')
const { AVATAR_PATH } = require('../constants/filePath')

const upload = Multer({
  dest: AVATAR_PATH,
})

const avatarHandler = upload.single('avatar')

module.exports = {
  avatarHandler,
}
