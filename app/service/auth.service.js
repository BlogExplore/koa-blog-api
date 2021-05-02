const connection = require('../config/db')

const sqlMap = new Map([
  ['create', `INSERT INTO user (username, password) VALUES (?, ?);`],
  ['getPer', `SELECT * FROM user WHERE username = ?;`],
])

class AuthService {}

module.exports = new AuthService()
