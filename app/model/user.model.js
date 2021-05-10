const seq = require('../config/sequelize')

const { STRING, DECIMAL } = require('../constants/seqTypes')

const USerModel = seq.define('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: `用户名唯一性`,
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: `密码`,
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: `昵称`,
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: `性别 1 男性 2 女性`,
  },
  avatar: {
    type: String,
    comment: `头像 头像的地址`,
  },
  city: {
    type: STRING,
    comment: `城市`,
  },
})

module.exports = USerModel
