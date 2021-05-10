const seq = require('../config/sequelize')

const { STRING, INTEGER, TEXT } = require('../constants/seqTypes')

const ArticleModel = seq.define('user', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: `用户的ID`,
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: `文章的内容`,
  },
  image: {
    type: STRING,
    comment: `图片地址`,
  },
})

module.exports = ArticleModel
