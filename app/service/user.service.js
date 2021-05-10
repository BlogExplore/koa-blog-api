const connection = require('../config/db')
const { _formatUser } = require('../utils/formatUser')
const sqlMap = new Map([
  [
    'createUser',
    `INSERT INTO users (username, password,gender) VALUES (?, ?, ?);`,
  ],
  ['getUserInfo', `SELECT * FROM users WHERE username = ?;`],
  ['list', `SELECT u.id id,u.username username,FROM users u LIMIT ?, ?;`],
])

class UserService {
  async createUser({ username, password, gender }) {
    // 密码需要加密
    const result = await connection.execute(sqlMap.get('createUser'), [
      username,
      password,
      gender,
    ])
    return result[0]
  }
  /**
   * @description 获取用户信息
   * @param {*} username
   * @param {*} password
   * @returns
   */
  async getUserInfo(username, password) {
    // 查到注册时候用户名
    const [result] = await connection.execute(sqlMap.get('getUserInfo'), [
      username,
    ])
    if (!result) {
      // 没有找到
      return result
    }
    const formatRes = _formatUser(result[0])
    return formatRes
  }
}

module.exports = new UserService()
