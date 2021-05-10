const Sequelize = require('sequelize')
const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST: host,
} = require('./index')

const { isProd } = require('../utils/env')
const conf = {
  host,
  dialect: 'mysql',
}
// 线上环境使用连接池
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000,
  }
}
const seq = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, conf)
module.exports = seq
