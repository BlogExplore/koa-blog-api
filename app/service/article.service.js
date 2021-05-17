const connection = require('../config/db')

const sqlMap = {
  create: `INSERT INTO articles (title,content, summary,userId) VALUES (?, ?,?,?);`,
  list: `SELECT a.id id,a.content content,a.createAt createAt, a.updateAt updateAt,
  JSON_OBJECT('userId',u.id,'username',u.username) author
  FROM articles a
  LEFT JOIN users u ON a.userId = u.id
  LIMIT ?, ?;
  `,
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
}

module.exports = new ArticleService()
