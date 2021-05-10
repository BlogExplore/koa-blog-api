/**
 * @description 同步数据库
 */
const seq = require('./sequelize')

// 导入所有数据model
require('../model/index')

seq
  .authenticate()
  .then(() => {
    console.log('auth ok')
  })
  .catch(() => {
    console.log('auth err')
  })

// 同步数据表
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})
