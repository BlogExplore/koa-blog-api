const connection = require('../config/db')
const { _formatUser } = require('../utils/formatUser')

const sqlMap = new Map([
  [
    'createUser',
    `INSERT INTO users (username, password) VALUES (?, ?);`,
  ],
  ['getUserInfo', `SELECT * FROM users WHERE username = ?;`],
  [
    'list',
    `SELECT u.id id,u.username username,u.avatarUrl avatarUrl,u.nickName nickName  FROM users u LIMIT ?, ?;`,
  ],
])

class UserService {
  async createUser({ username, password, gender }) {
    // 密码需要加密
    const result = await connection.execute(sqlMap.get('createUser'), [
      username,
      password,
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
    try {
      const [res] = await connection.execute(sqlMap.get('getUserInfo'), [
        username,
      ])
      if (res.length === 0) {
        // 没有找到
        return res
      }
      const formatRes = _formatUser(res[0])
      return [formatRes]
    } catch (error) {
      console.log(error)
    }
  }
  async list(limit, offset) {
    try {
      const [res] = await connection.execute(sqlMap.get('list'), [
        offset,
        limit,
      ])
      return res
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new UserService()
