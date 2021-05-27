const connection = require('../config/db')
const sql = {
  createAvatar: `INSERT INTO avatars (filename, mimetype, size, userId) VALUES (?, ?, ?, ?)`,
  updateAvatarByUserId: `UPDATE users SET avatarUrl = ? WHERE id = ?;`,
  createCover: `INSERT INTO files (filename, mimetype, size, userId, articleId) VALUES (?, ?, ?, ?, ?)`,
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
  async saveCover({ filename, mimetype, size, id, articleId }) {
    try {
      const res = await connection.execute(sql.createCover)
    } catch (error) {}
  }
}

module.exports = new FileService()
