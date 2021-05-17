const connection = require('../config/db')
const sql = {
  create: `INSERT INTO comments (content, articleId, userId) VALUES (?, ?, ?);`,
  reply: `INSERT INTO comments (content, articleId, userId, commentId) VALUES (?, ?, ?, ?);`,
  list: `
  SELECT 
        m.id, m.content, m.commentId commentId, m.createAt createTime,
        JSON_OBJECT('id', u.id, 'username', u.username) user
      FROM comments m
      LEFT JOIN users u ON u.id = m.userId
      WHERE articleId = ?;
  `,
}

class CommentService {
  async create({ articleId, content, userId }) {
    const [res] = await connection.execute(sql['create'], [
      content,
      articleId,
      userId,
    ])
    return res
  }
  async doReply({ articleId, content, commentId, userId }) {
    const [res] = await connection.execute(sql['reply'], [
      content,
      articleId,
      userId,
      commentId,
    ])
    return res
  }
  async getCommentsArticleId(articleId) {
    const [res] = await connection.execute(sql['list'], [articleId])
    return res
  }
}

module.exports = new CommentService()
