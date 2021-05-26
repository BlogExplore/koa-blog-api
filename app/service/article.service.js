const connection = require('../config/db')

const sqlMap = {
  create: `INSERT INTO articles (title,content, summary,userId) VALUES (?, ?,?,?);`,
  list: `SELECT a.id id,a.title title,a.summary summary, a.content content,a.createAt createAt, a.updateAt updateAt,
  JSON_OBJECT('userId',u.id,'username',u.username) author
  FROM articles a
  LEFT JOIN users u ON a.userId = u.id
  LIMIT ?, ?;`,
  detail: `
  SELECT a.id id ,a.title title,a.summary summary, a.content content, a.createAt createTime, a.updateAt updateTime FROM articles a WHERE a.id = ?;
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
  async list({ offset, limit }) {
    try {
      const [res] = await connection.execute(sqlMap['list'], [offset, limit])
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async getInfoById(articleId) {
    try {
      const [res] = await connection.execute(sqlMap.detail, [articleId])

      return res[0]
    } catch (error) {}
  }
}

module.exports = new ArticleService()
