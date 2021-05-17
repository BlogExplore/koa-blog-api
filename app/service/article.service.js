const connection = require('../config/db')

const sqlMap = {
  create: `INSERT INTO articles (title,content, summary,userId) VALUES (?, ?,?,?);`,
  list: `SELECT a.id id,a.content content,a.createAt createAt, a.updateAt updateAt,
  JSON_OBJECT('userId',u.id,'username',u.username) author
  FROM articles a
  LEFT JOIN users u ON a.userId = u.id
  LIMIT ?, ?;
  `,
  detail: `
  SELECT 
        a.id id, a.content content, a.createAt createTime, a.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'username', u.username,) author,
        IF(COUNT(l.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'labelName', l.labelName)
        ),NULL) labels,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.commentId, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'username', cu.username))
        ),NULL) FROM comments c LEFT JOIN users cu ON c.userId = cu.id WHERE a.id = c.articleId) comments,
      FROM articles a
      LEFT JOIN users u ON a.userId = u.id
      WHERE a.id = ?
      GROUP BY a.id;`,
}

class ArticleService {
  async create({ title, content, summary, userId }) {
    const [res] = await connection.execute(sqlMap['create'], [
      title,
      content,
      summary,
      userId,
    ])
    return res
  }
  async list(offset, limit) {
    const [res] = await connection.execute(sqlMap['list'], [offset, limit])
    return res
  }
  async getInfoById(articleId) {}
}

module.exports = new ArticleService()
