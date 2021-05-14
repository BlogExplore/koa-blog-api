const connection = require('../config/db')
const sql = {
  createAvatar: `INSERT INTO avatars (filename, mimetype, size, userId) VALUES (?, ?, ?, ?)`,
  updateAvatarByUserId: `UPDATE users SET avatarUrl = ? WHERE id = ?;`,
}
class FileService {
  async createAvatar({ filename, mimetype, size, id }) {
    const [res] = await connection.execute(sql['createAvatar'], [
      filename,
      mimetype,
      size,
      id,
    ])
    return res
  }
  async updateAvatarByUserId({ baserUrlAvatar, id }) {
    const [res] = await connection.execute(sql['updateAvatarByUserId'], [
      baserUrlAvatar,
      id,
    ])
    return res
  }
}

module.exports = new FileService()
