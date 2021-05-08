const connection = require('../config/db')

const sqlMap = {
  create: `INSERT INTO labels (labelName) VALUES (?);`,
  list: `SELECT * FROM labels LIMIT ?,?;`,
}

class LabelService {
  async create(labelName) {
    const [res] = await connection.execute(sqlMap['create'], [labelName])
    return res
  }
  async list(limit, offset) {
    const [res] = await connection.execute(sqlMap['list'], [offset, limit])

    return res
  }
}

module.exports = new LabelService()
