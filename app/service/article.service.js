const connection = require('../config/db')

const sqlMap = {
  create: `INSERT INTO article (content, user_id) VALUES (?, ?);`,
}

class ArticleService {
  async create(userId, con) {
    console.log(userId)
    console.log(con)
    const [res] = await connection.execute(sqlMap['create'], [con, userId])
    return res
  }
}

module.exports = new ArticleService()
