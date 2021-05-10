const UserModel = require('./user.model')

const ArticleModel = require('./article.model')

ArticleModel.belongsTo(UserModel, {
  foreignKey: 'userId',
})

module.exports = {
  UserModel,
  ArticleModel,
}
