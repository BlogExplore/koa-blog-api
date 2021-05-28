const connection = require('../config/db')

const sqlMap = {
  create: `INSERT INTO articles (title,content, summary,userId,coverImg,labelIds) VALUES (?, ?,?,?,?,?);`,
  list: `  SELECT a.id id,a.title title,a.summary summary, a.content content,a.createAt createAt, a.updateAt updateAt,
  JSON_OBJECT('userId',u.id,'username',u.username) author,
	(SELECT COUNT(*) FROM articles_labels al WHERE al.articleId = a.id) labelCount,
	(SELECT CONCAT('http://127.0.0.1:3009/api/v1/article/cover/', files.filename)
        FROM files WHERE a.id = files.articleId) coverImg
  FROM articles a
  LEFT JOIN users u ON a.userId = u.id
  LIMIT ?, ?;`,
  detail: `
  SELECT a.id id,a.title title,a.summary summary,a.content content,IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'labelName', l.labelName)),NULL) labels  FROM articles a LEFT JOIN articles_labels al ON a.id = al.articleId LEFT JOIN labels l ON al.labelId = l.id
WHERE a.id = ?
GROUP BY a.id;
  `,
  addLabel: `INSERT INTO articles_labels (articleId, labelId) VALUES (?, ?);`,
}

class ArticleService {
  async create({ title, content, summary, userId, labelIds, coverImg }) {
    const [res] = await connection.execute(sqlMap['create'], [
      title,
      content,
      summary,
      userId,
      labelIds,
      coverImg,
    ])
    return res
  }
  async list({ offset, limit }) {
    try {
      const [res] = await connection.execute(sqlMap['list'], [offset, limit])
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async getInfoById(articleId) {
    try {
      const [res] = await connection.execute(sqlMap.detail, [articleId])

      return res[0]
    } catch (error) {}
  }
  /**
   * @description 给文章添加标签
   * @param {*} aId 文章的id
   * @param {*} lId 标签的id
   */
  async addLabel(aId, lId) {
    try {
      const [res] = await connection.execute(sqlMap.addLabel, [aId, lId])
      return res
    } catch (error) {}
  }
}

module.exports = new ArticleService()
