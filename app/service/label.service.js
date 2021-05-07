const connection = require('../config/db')

const sqlMap = {
  create: `INSERT INTO label (name) VALUES (?);`,
}

class LabelService {
  async create(name) {
    const [res] = await connection.execute(sqlMap['create'], [name])
    console.log(res)
    return res
  }
}

module.exports = LabelService
