const connection = require('../config/db')

const sqlMap = new Map([
  ['create', `INSERT INTO user (username, password) VALUES (?, ?);`],
  ['getPer', `SELECT * FROM user WHERE username = ?;`],
  ['list', `SELECT u.id id,u.username username,FROM user u LIMIT ?, ?;`],
])

class UserService {
  async create(userInfo) {
    const { password, username } = userInfo
    const result = await connection.execute(sqlMap.get('create'), [
      username,
      password,
    ])
    return result[0]
  }

  async getUserByName(username) {
    const result = await connection.execute(sqlMap.get('getPer'), [username])
    return result[0]
  }

  async list(offset, size) {
    console.log(offset)
    console.log(size)
    // const res = await connection.execute(sqlMap['list'], [offset, size])
  }
}

module.exports = new UserService()
