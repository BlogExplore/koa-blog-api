const connection = require('../config/db')

const sqlMap = {
  create: `INSERT INTO articles (content, userId) VALUES (?, ?);`,
  list: `SELECT a.id id,a.content content,a.createAt createAt, a.updateAt updateAt,
  JSON_OBJECT('userId',u.id,'username',u.username) author
  FROM articles a
  LEFT JOIN users u ON a.userId = u.id;
  `,
}

class ArticleService {
  async create(userId, con) {
    const [res] = await connection.execute(sqlMap['create'], [con, userId])
    return res
  }
  async list(offset, limit) {}
}

module.exports = new ArticleService()
